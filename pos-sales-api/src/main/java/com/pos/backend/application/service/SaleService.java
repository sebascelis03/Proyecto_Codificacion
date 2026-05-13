package com.pos.backend.application.service;

import com.pos.backend.domain.entity.Product;
import com.pos.backend.domain.entity.Sale;
import com.pos.backend.domain.entity.SaleItem;
import com.pos.backend.domain.entity.SaleStatus;
import com.pos.backend.infrastructure.persistence.ProductRepository;
import com.pos.backend.infrastructure.persistence.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SaleService {
    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;

    @Transactional
    public Sale createSale(String terminalId, String cashierId) {
        Sale sale = Sale.builder()
                .terminalId(terminalId)
                .cashierId(cashierId)
                .status(SaleStatus.ACTIVE)
                .build();
        return saleRepository.save(sale);
    }

    @Transactional
    public Sale addItem(String saleId, String productId, int quantity) {
        Sale sale = saleRepository.findById(saleId)
                .orElseThrow(() -> new RuntimeException("Sale not found"));
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStock() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }

        SaleItem item = SaleItem.builder()
                .productId(product.getId())
                .productName(product.getName())
                .unitPrice(product.getPrice())
                .quantity(quantity)
                .build();
        item.calculateLineTotal();
        
        sale.getItems().add(item);
        sale.calculateTotals();
        
        return saleRepository.save(sale);
    }

    @Transactional
    public Sale processCheckout(String saleId, String paymentType, BigDecimal amountReceived) {
        Sale sale = saleRepository.findById(saleId)
                .orElseThrow(() -> new RuntimeException("Sale not found"));

        if (paymentType.equals("CASH")) {
            if (amountReceived.compareTo(sale.getTotal()) < 0) {
                throw new RuntimeException("Insufficient payment amount");
            }
        }

        sale.setStatus(SaleStatus.COMPLETED);
        sale.setPaymentType(paymentType);
        
        // Decrement stock
        for (SaleItem item : sale.getItems()) {
            Product product = productRepository.findById(item.getProductId()).get();
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);
        }

        return saleRepository.save(sale);
    }

    public List<Sale> getFrozenSales(String terminalId) {
        return saleRepository.findByTerminalIdAndStatus(terminalId, SaleStatus.FROZEN);
    }
}

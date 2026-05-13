package com.pos.backend.adapter.in.web;

import com.pos.backend.application.service.SaleService;
import com.pos.backend.domain.entity.Sale;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class SaleController {
    private final SaleService saleService;

    @PostMapping
    public ResponseEntity<Sale> createSale(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(saleService.createSale(
                request.get("terminalId"),
                request.get("cashierId")
        ));
    }

    @PostMapping("/{id}/items")
    public ResponseEntity<Sale> addItem(@PathVariable String id, @RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(saleService.addItem(
                id,
                (String) request.get("productId"),
                (Integer) request.get("quantity")
        ));
    }

    @PostMapping("/{id}/checkout")
    public ResponseEntity<Sale> checkout(@PathVariable String id, @RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(saleService.processCheckout(
                id,
                (String) request.get("paymentType"),
                new BigDecimal(request.get("amountReceived").toString())
        ));
    }
}

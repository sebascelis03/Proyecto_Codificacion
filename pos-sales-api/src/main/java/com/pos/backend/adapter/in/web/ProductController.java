package com.pos.backend.adapter.in.web;

import com.pos.backend.domain.entity.Product;
import com.pos.backend.infrastructure.persistence.ProductRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    @PostConstruct
    public void init() {
        if (productRepository.count() == 0) {
            productRepository.saveAll(Arrays.asList(
                Product.builder().sku("SKU001").name("Café Espresso").price(new BigDecimal("2.50")).stock(50).categoryId("c1").isActive(true).build(),
                Product.builder().sku("SKU002").name("Latte").price(new BigDecimal("3.50")).stock(3).categoryId("c1").isActive(true).build(),
                Product.builder().sku("SKU003").name("Croissant").price(new BigDecimal("2.00")).stock(0).categoryId("c2").isActive(true).build(),
                Product.builder().sku("123456789").name("Agua Mineral").price(new BigDecimal("1.50")).stock(100).categoryId("c3").isActive(true).build()
            ));
        }
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String q) {
        String query = q.toLowerCase();
        return productRepository.findAll().stream()
                .filter(p -> p.getName().toLowerCase().contains(query) || p.getSku().toLowerCase().contains(query))
                .toList();
    }

    @GetMapping("/{sku}")
    public Product getBySku(@PathVariable String sku) {
        return productRepository.findBySku(sku).orElse(null);
    }
}

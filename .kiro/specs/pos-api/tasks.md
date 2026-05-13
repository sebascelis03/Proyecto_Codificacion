# Implementation Tasks (Sales API)

- [x] 1. Initialize Spring Boot project with dependencies (Web, JPA, H2, Validation).
- [x] 2. Organize structure following Hexagonal Architecture (`domain`, `application`, `adapter`, `infrastructure`).
- [x] 3. Create Domain Models (`Sale`, `SaleItem`, `SaleStatus` enum).
- [x] 4. Implement Value Object `Money` / `BigDecimal` logic for calculations.
- [x] 5. Create JPA Repositories in `infrastructure`.
- [x] 6. Implement `SaleService` in `application.service` for creating sales and managing items.
- [x] 7. Implement checkout logic (CASH validation, stock decrement).
- [x] 8. Expose REST Controllers (`SaleController`, `ProductController`) in `adapter.in.web`.
- [x] 9. Populate initial product database via `@PostConstruct`.
- [x] 10. Write unit and integration tests (with Mockito and @SpringBootTest).
- [x] 11. Configure JaCoCo plugin and verify coverage.

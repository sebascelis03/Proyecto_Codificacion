# Sales API Design

## Architecture
- **Layered Pattern:** Arquitectura Hexagonal (Ports and Adapters).
  - `domain`: Entities, Value Objects (`Money`).
  - `application`: Business Use Cases (`SaleService`).
  - `adapter`: Inbound/Outbound adapters (`SaleController`, REST integrations).
  - `infrastructure`: Database configuration, Repositories (Spring Data JPA).

## Domain Model
- `Sale`: id, terminalId, cashierId, customerId, status, subtotal, tax, discount, total, paymentType, createdAt.
- `SaleItem`: id, saleId, productId, productName, unitPrice, quantity, lineTotal.

## Tech Stack
- Java 17, Spring Boot 3.x
- Spring Data JPA, H2 Database (in-memory)
- SpringDoc OpenAPI
- JaCoCo, JUnit 5, Mockito

## API Endpoints
- `GET /api/products`
- `GET /api/products/search?q={query}`
- `POST /api/sales`
- `POST /api/sales/{id}/items`
- `POST /api/sales/{id}/checkout`

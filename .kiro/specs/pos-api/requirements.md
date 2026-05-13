# Sales API Requirements

## User Stories

### 1. Product Search
**As a** cashier,
**I want to** search for products by name or barcode,
**So that** I can add them to the sale quickly.

**Acceptance Criteria:**
- GET `/api/products?name={query}` returns products matching the name.
- GET `/api/products?barcode={code}` returns the exact product.
- If the external Product API is down, return `503 Service Unavailable`.

### 2. Customer Search
**As a** cashier,
**I want to** search for customers by name or document number,
**So that** I can link them to credit sales or invoices.

**Acceptance Criteria:**
- GET `/api/customers?name={query}` and `?document={doc}` return matching customers.
- Includes credit status (APPROVED, REJECTED, PENDING).

### 3. Sale Management
**As a** cashier,
**I want to** create and modify an active sale,
**So that** I can process a customer's items.

**Acceptance Criteria:**
- POST `/api/sales` creates an ACTIVE sale.
- POST `/api/sales/{id}/items` adds items, validating stock via Product API.
- Re-calculates totals using BigDecimal (subtotal, 19% tax, discount, total).

### 4. Sale Freezing and Cancellation
**As a** cashier,
**I want to** hold (freeze) or cancel a sale,
**So that** I can handle exceptions without losing data.

**Acceptance Criteria:**
- POST `/api/sales/{id}/freeze` sets state to FROZEN.
- POST `/api/sales/{id}/cancel` sets state to CANCELLED (requires reason).
- Frozen sales expire and cancel automatically after 2 hours.

### 5. Checkout
**As a** cashier,
**I want to** complete the sale using CASH or CREDIT,
**So that** the transaction is finalized.

**Acceptance Criteria:**
- CASH requires amount >= total.
- CREDIT requires a linked customer with APPROVED status.
- Checkout decrements stock in Product API.
- If out-of-stock, returns `409 Conflict`.
- Generates a receipt.

### 6. Returns
**As a** manager,
**I want to** process full or partial returns,
**So that** inventory and accounting are corrected.

**Acceptance Criteria:**
- POST `/api/sales/{id}/returns` (full or partial).
- Increments stock in Product API.
- Cannot exceed original quantities.

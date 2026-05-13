# POS Frontend Requirements

## User Stories

### 1. Product Search and Discovery
**As a** cashier,
**I want to** search products by name or scan barcodes,
**So that** I can add them to the customer's cart.

**Acceptance Criteria:**
- The interface has a search bar.
- Products are NOT displayed by default; they only appear when typing a query.
- The search supports partial matching (fuzzy search).
- Barcode scanning immediately adds the product if an exact match is found.

### 2. Cart Management
**As a** cashier,
**I want to** view and modify the shopping cart,
**So that** I can adjust quantities or remove items before checkout.

**Acceptance Criteria:**
- Cart displays product name, unit price, quantity, and line total.
- Cashier can increment, decrement, or remove items.
- Running totals (subtotal, tax, discount, total) are updated in real-time.

### 3. Payment Processing
**As a** cashier,
**I want to** select a payment method and process the checkout,
**So that** the transaction is finalized.

**Acceptance Criteria:**
- Support Cash and Credit options.
- Cash requires entering the received amount and shows the change due.
- Checkout finalizes the sale and displays a digital receipt.

### 4. Offline Capabilities
**As a** cashier,
**I want to** continue searching products and managing the cart even if the internet drops,
**So that** checkout operations are not blocked.

**Acceptance Criteria:**
- Product catalog is cached locally.
- Core cart operations work without a network connection.

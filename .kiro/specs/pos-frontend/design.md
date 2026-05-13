# POS Frontend Design

## Architecture
- **Framework:** Next.js / React (SPA).
- **Language:** Strict TypeScript.
- **Architecture Pattern:** Arquitectura Hexagonal (Ports and Adapters).
- **State Management:** Zustand (acting as State Adapters).
- **Styling:** Tailwind CSS.

## Directory Structure
- `core/`: Business entities, policies, and use-cases.
- `adapters/`: Implementations of ports, HTTP clients, and global Zustand state.
- `features/`: UI components and views.

## Data Models (TypeScript Interfaces)
- `Product`: id, sku (barcode), name, price, stock, category.
- `CartItem`: product, quantity, lineTotal.
- `Sale`: id, items, subtotal, tax, total, paymentMethod.

## Offline Strategy
- LocalStorage / IndexedDB via Adapters for syncing the product catalog on initial load.

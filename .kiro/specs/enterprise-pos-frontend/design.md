# Design Document — Enterprise POS Frontend

## Overview

Este documento describe el diseño técnico del frontend del sistema POS empresarial. La arquitectura sigue el patrón Hexagonal (Ports & Adapters), garantizando que el dominio sea puro e independiente de Next.js, React o cualquier librería de terceros. Todos los módulos aplican principios SOLID, DIP y TypeScript strict.

---

## Tech Stack

| Concern | Library / Tool |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript 5+ (`strict: true`) |
| State Management | Zustand 4+ |
| Server State / Cache | TanStack Query v5 |
| Validation | Zod |
| Styling | Tailwind CSS 3+ |
| UI Primitives | Radix UI |
| Forms | React Hook Form + Zod resolver |
| Offline Storage | IndexedDB via `idb` |
| Charts | Recharts (swappable via Service Port) |
| Testing | Vitest + React Testing Library + fast-check (PBT) |
| E2E | Playwright |
| Linting | ESLint + Prettier |
| DI Container | Custom factory functions in `infrastructure/di/` |

---

## Project Structure

```
src/
├── domain/                          # Pure domain — NO framework imports
│   ├── entities/                    # Core business entities
│   │   ├── Cart.ts
│   │   ├── CartItem.ts
│   │   ├── Customer.ts
│   │   ├── Discount.ts
│   │   ├── InventoryItem.ts
│   │   ├── Product.ts
│   │   ├── Receipt.ts
│   │   ├── Refund.ts
│   │   ├── Shift.ts
│   │   ├── Tax.ts
│   │   ├── Terminal.ts
│   │   ├── Transaction.ts
│   │   └── User.ts
│   ├── value-objects/               # Immutable value types
│   │   ├── Email.ts
│   │   ├── Money.ts
│   │   ├── PhoneNumber.ts
│   │   ├── SKU.ts
│   │   └── TransactionId.ts
│   ├── ports/                       # Interfaces (contracts) — no implementations
│   │   ├── repositories/
│   │   │   ├── ICartRepository.ts
│   │   │   ├── ICustomerRepository.ts
│   │   │   ├── IInventoryRepository.ts
│   │   │   ├── IProductRepository.ts
│   │   │   ├── IShiftRepository.ts
│   │   │   └── ITransactionRepository.ts
│   │   └── services/
│   │       ├── IAuthService.ts
│   │       ├── IDiscountService.ts
│   │       ├── ILoggingService.ts
│   │       ├── IMetricsService.ts
│   │       ├── IPaymentService.ts
│   │       ├── IPrintService.ts
│   │       └── ISyncService.ts
│   ├── policies/                    # RBAC permission definitions
│   │   ├── permissions.ts
│   │   └── roles.ts
│   └── use-cases/                   # Application logic orchestrators
│       ├── auth/
│       │   ├── LoginUseCase.ts
│       │   ├── LogoutUseCase.ts
│       │   └── RefreshTokenUseCase.ts
│       ├── cart/
│       │   ├── AddItemToCartUseCase.ts
│       │   ├── ApplyCouponUseCase.ts
│       │   ├── ApplyDiscountUseCase.ts
│       │   ├── ClearCartUseCase.ts
│       │   └── RemoveItemFromCartUseCase.ts
│       ├── customer/
│       │   ├── CreateCustomerUseCase.ts
│       │   ├── FindCustomerUseCase.ts
│       │   └── UpdateCustomerUseCase.ts
│       ├── inventory/
│       │   ├── AdjustInventoryUseCase.ts
│       │   └── TransferStockUseCase.ts
│       ├── payment/
│       │   ├── ProcessPaymentUseCase.ts
│       │   └── ProcessSplitPaymentUseCase.ts
│       ├── reports/
│       │   └── GenerateReportUseCase.ts
│       ├── shift/
│       │   ├── CloseShiftUseCase.ts
│       │   └── OpenShiftUseCase.ts
│       └── transaction/
│           ├── CompleteTransactionUseCase.ts
│           ├── ProcessRefundUseCase.ts
│           └── VoidTransactionUseCase.ts
│
├── infrastructure/                  # Adapters & framework glue
│   ├── adapters/
│   │   ├── repositories/
│   │   │   ├── HttpCartRepository.ts
│   │   │   ├── HttpCustomerRepository.ts
│   │   │   ├── HttpInventoryRepository.ts
│   │   │   ├── HttpProductRepository.ts
│   │   │   ├── HttpShiftRepository.ts
│   │   │   ├── HttpTransactionRepository.ts
│   │   │   ├── IndexedDbCartRepository.ts    # Offline fallback
│   │   │   └── IndexedDbTransactionRepository.ts
│   │   └── services/
│   │       ├── JwtAuthService.ts
│   │       ├── RestDiscountService.ts
│   │       ├── SentryLoggingService.ts
│   │       ├── WebVitalsMetricsService.ts
│   │       ├── StripePaymentService.ts
│   │       ├── ThermalPrintService.ts
│   │       └── BackgroundSyncService.ts
│   ├── di/                          # Dependency injection factories
│   │   ├── authContainer.ts
│   │   ├── cartContainer.ts
│   │   ├── customerContainer.ts
│   │   ├── inventoryContainer.ts
│   │   ├── paymentContainer.ts
│   │   └── reportsContainer.ts
│   ├── http/
│   │   ├── apiClient.ts             # Axios/fetch wrapper with interceptors
│   │   └── endpoints.ts
│   ├── offline/
│   │   ├── db.ts                    # IndexedDB schema via `idb`
│   │   ├── syncQueue.ts             # Offline transaction queue
│   │   └── conflictResolver.ts
│   └── storage/
│       ├── cartStorage.ts           # Encrypted localStorage for Cart
│       └── sessionStorage.ts
│
├── app/                             # Next.js App Router
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (pos)/                       # Protected POS routes
│   │   ├── layout.tsx               # Auth guard + shift guard
│   │   ├── sale/
│   │   │   └── page.tsx             # Main cashier screen
│   │   ├── shift/
│   │   │   ├── open/page.tsx
│   │   │   └── close/page.tsx
│   │   ├── refund/
│   │   │   └── page.tsx
│   │   └── customers/
│   │       └── page.tsx
│   ├── (manager)/                   # Manager-only routes
│   │   ├── layout.tsx
│   │   ├── reports/
│   │   │   └── page.tsx
│   │   ├── inventory/
│   │   │   └── page.tsx
│   │   └── shifts/
│   │       └── page.tsx
│   ├── (admin)/                     # Admin-only routes
│   │   ├── layout.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── catalog/
│   │       └── page.tsx
│   ├── api/                         # Next.js Route Handlers (BFF layer)
│   │   ├── auth/[...nextauth]/route.ts
│   │   └── sync/route.ts
│   ├── error.tsx                    # Global error boundary
│   ├── not-found.tsx
│   └── layout.tsx                   # Root layout with providers
│
├── components/                      # UI Components (SRP enforced)
│   ├── ui/                          # Primitive components (Radix-based)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Skeleton.tsx
│   │   └── Toast.tsx
│   ├── pos/                         # POS-specific composite components
│   │   ├── CartPanel/
│   │   │   ├── CartPanel.tsx
│   │   │   ├── CartItem.tsx
│   │   │   └── CartTotals.tsx
│   │   ├── ProductGrid/
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductSearch.tsx
│   │   ├── PaymentModal/
│   │   │   ├── PaymentModal.tsx
│   │   │   ├── CashTender.tsx
│   │   │   ├── CardTender.tsx
│   │   │   └── SplitTender.tsx
│   │   ├── ShiftSummary/
│   │   │   └── ShiftSummary.tsx
│   │   └── ReceiptPreview/
│   │       └── ReceiptPreview.tsx
│   └── layout/
│       ├── Sidebar.tsx
│       ├── TopBar.tsx
│       └── OfflineBanner.tsx
│
├── hooks/                           # Custom React hooks (SRP)
│   ├── useCart.ts
│   ├── useProducts.ts
│   ├── useCustomer.ts
│   ├── usePayment.ts
│   ├── useShift.ts
│   ├── useOfflineStatus.ts
│   ├── usePermission.ts
│   └── useInactivityLock.ts
│
├── stores/                          # Zustand stores
│   ├── cartStore.ts
│   ├── authStore.ts
│   ├── shiftStore.ts
│   └── offlineStore.ts
│
├── lib/                             # Shared utilities
│   ├── formatCurrency.ts
│   ├── formatDate.ts
│   └── cn.ts                        # Tailwind class merger
│
└── types/                           # Shared TypeScript types
    ├── api.ts
    └── env.d.ts
```

---

## Domain Layer Design

### Core Entities

```typescript
// domain/entities/Product.ts
export interface Product {
  readonly id: string;
  readonly sku: SKU;
  readonly name: string;
  readonly price: Money;
  readonly stock: number;
  readonly categoryId: string;
  readonly variants: ProductVariant[];
  readonly isActive: boolean;
}

// domain/entities/Cart.ts
export interface Cart {
  readonly id: string;
  readonly items: CartItem[];
  readonly customerId: string | null;
  readonly discounts: Discount[];
  readonly couponCode: string | null;
  readonly status: 'active' | 'on-hold' | 'completed' | 'voided';
}

// domain/entities/Transaction.ts
export interface Transaction {
  readonly id: TransactionId;
  readonly cartSnapshot: Cart;
  readonly tenders: TenderEntry[];
  readonly subtotal: Money;
  readonly taxAmount: Money;
  readonly discountAmount: Money;
  readonly total: Money;
  readonly cashierId: string;
  readonly terminalId: string;
  readonly shiftId: string;
  readonly completedAt: Date;
  readonly receiptUrl: string | null;
}
```

### Value Objects

```typescript
// domain/value-objects/Money.ts
export class Money {
  private constructor(
    readonly amount: number,   // stored in cents
    readonly currency: string
  ) {}

  static of(amount: number, currency: string): Money {
    if (amount < 0) throw new Error('Money cannot be negative');
    return new Money(Math.round(amount), currency);
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount - other.amount, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(Math.round(this.amount * factor), this.currency);
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error(`Currency mismatch: ${this.currency} vs ${other.currency}`);
    }
  }
}
```

### Ports (Interfaces)

```typescript
// domain/ports/repositories/IProductRepository.ts
export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findBySku(sku: SKU): Promise<Product | null>;
  search(query: string, options: SearchOptions): Promise<PaginatedResult<Product>>;
  findByCategory(categoryId: string, page: number): Promise<PaginatedResult<Product>>;
  findFrequent(limit: number): Promise<Product[]>;
}

// domain/ports/services/IPaymentService.ts
export interface IPaymentService {
  initiate(request: PaymentRequest): Promise<PaymentSession>;
  confirm(sessionId: string): Promise<PaymentResult>;
  cancel(sessionId: string): Promise<void>;
  getStatus(sessionId: string): Promise<PaymentStatus>;
}

// domain/ports/services/ILoggingService.ts
export interface ILoggingService {
  info(event: string, context: LogContext): void;
  warn(event: string, context: LogContext): void;
  error(event: string, error: Error, context: LogContext): void;
}

// domain/ports/services/IPrintService.ts
export interface IPrintService {
  printReceipt(receipt: Receipt): Promise<PrintResult>;
  printShiftReport(shift: Shift): Promise<PrintResult>;
  isAvailable(): Promise<boolean>;
}
```

### RBAC Policies

```typescript
// domain/policies/permissions.ts
export const PERMISSIONS = {
  SALES_CREATE: 'sales:create',
  SALES_VOID: 'sales:void',
  SALES_REFUND: 'sales:refund',
  DISCOUNT_APPLY_ITEM: 'discount:apply:item',
  DISCOUNT_APPLY_GLOBAL: 'discount:apply:global',
  REPORTS_VIEW: 'reports:view',
  REPORTS_EXPORT: 'reports:export',
  INVENTORY_ADJUST: 'inventory:adjust',
  INVENTORY_TRANSFER: 'inventory:transfer',
  CUSTOMERS_EDIT: 'customers:edit',
  SETTINGS_MANAGE: 'settings:manage',
  TERMINALS_MANAGE: 'terminals:manage',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// domain/policies/roles.ts
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  cashier: [
    PERMISSIONS.SALES_CREATE,
    PERMISSIONS.DISCOUNT_APPLY_ITEM,
  ],
  manager: [
    PERMISSIONS.SALES_CREATE,
    PERMISSIONS.SALES_VOID,
    PERMISSIONS.SALES_REFUND,
    PERMISSIONS.DISCOUNT_APPLY_ITEM,
    PERMISSIONS.DISCOUNT_APPLY_GLOBAL,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_EXPORT,
    PERMISSIONS.INVENTORY_ADJUST,
    PERMISSIONS.INVENTORY_TRANSFER,
    PERMISSIONS.CUSTOMERS_EDIT,
  ],
  admin: Object.values(PERMISSIONS),
};
```

---

## Application Layer — Use Cases

```typescript
// domain/use-cases/cart/AddItemToCartUseCase.ts
export class AddItemToCartUseCase {
  constructor(
    private readonly productRepo: IProductRepository,
    private readonly cartRepo: ICartRepository,
    private readonly logger: ILoggingService
  ) {}

  async execute(cartId: string, productId: string, quantity: number): Promise<Cart> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new ProductNotFoundError(productId);
    if (product.stock === 0) throw new OutOfStockError(product.sku);

    const cart = await this.cartRepo.findById(cartId);
    if (!cart) throw new CartNotFoundError(cartId);

    const updatedCart = addItemToCart(cart, product, quantity);
    await this.cartRepo.save(updatedCart);

    this.logger.info('cart.item_added', { cartId, productId, quantity });
    return updatedCart;
  }
}
```

---

## Infrastructure Layer — Adapters

### HTTP Adapter Example

```typescript
// infrastructure/adapters/repositories/HttpProductRepository.ts
export class HttpProductRepository implements IProductRepository {
  constructor(private readonly client: ApiClient) {}

  async findById(id: string): Promise<Product | null> {
    const response = await this.client.get(`/products/${id}`);
    if (response.status === 404) return null;
    return ProductSchema.parse(response.data); // Zod validation
  }

  async search(query: string, options: SearchOptions): Promise<PaginatedResult<Product>> {
    const response = await this.client.get('/products/search', {
      params: { q: query, ...options }
    });
    return PaginatedProductSchema.parse(response.data);
  }
}
```

### Offline IndexedDB Adapter

```typescript
// infrastructure/adapters/repositories/IndexedDbTransactionRepository.ts
export class IndexedDbTransactionRepository implements ITransactionRepository {
  constructor(private readonly db: IDBDatabase) {}

  async save(transaction: Transaction): Promise<void> {
    const tx = this.db.transaction('transactions', 'readwrite');
    await tx.objectStore('transactions').put(transaction);
  }

  async findPendingSync(): Promise<Transaction[]> {
    const tx = this.db.transaction('transactions', 'readonly');
    return tx.objectStore('transactions')
      .index('syncStatus')
      .getAll('pending');
  }
}
```

### DI Container

```typescript
// infrastructure/di/cartContainer.ts
export function createCartUseCases(mode: 'online' | 'offline') {
  const productRepo = mode === 'online'
    ? new HttpProductRepository(apiClient)
    : new IndexedDbProductRepository(db);

  const cartRepo = new HttpCartRepository(apiClient);
  const logger = new SentryLoggingService();

  return {
    addItem: new AddItemToCartUseCase(productRepo, cartRepo, logger),
    removeItem: new RemoveItemFromCartUseCase(cartRepo, logger),
    applyCoupon: new ApplyCouponUseCase(cartRepo, discountService, logger),
    clearCart: new ClearCartUseCase(cartRepo, logger),
  };
}
```

---

## State Management (Zustand)

```typescript
// stores/cartStore.ts
interface CartState {
  carts: Record<string, Cart>;
  activeCartId: string | null;
  actions: {
    setActiveCart: (id: string) => void;
    updateCart: (cart: Cart) => void;
    removeCart: (id: string) => void;
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      carts: {},
      activeCartId: null,
      actions: {
        setActiveCart: (id) => set({ activeCartId: id }),
        updateCart: (cart) => set((s) => ({
          carts: { ...s.carts, [cart.id]: cart }
        })),
        removeCart: (id) => set((s) => {
          const { [id]: _, ...rest } = s.carts;
          return { carts: rest };
        }),
      },
    }),
    { name: 'pos-cart', storage: encryptedStorage }
  )
);
```

---

## Offline Strategy

```
┌─────────────────────────────────────────────────────┐
│                   POS_App                           │
│                                                     │
│  ┌──────────────┐    ┌──────────────────────────┐  │
│  │  Online Mode │    │     Offline Mode          │  │
│  │              │    │                           │  │
│  │  HTTP Repos  │    │  IndexedDB Repos          │  │
│  │  Real-time   │    │  Cached data              │  │
│  │  sync        │    │  Transaction queue        │  │
│  └──────┬───────┘    └──────────┬────────────────┘  │
│         │                       │                   │
│         └──────────┬────────────┘                   │
│                    │                                │
│           ┌────────▼────────┐                       │
│           │  SyncService    │                       │
│           │  (Port Adapter) │                       │
│           └─────────────────┘                       │
└─────────────────────────────────────────────────────┘
```

### IndexedDB Schema

```typescript
// infrastructure/offline/db.ts
export const DB_SCHEMA = {
  name: 'pos-offline-db',
  version: 1,
  stores: {
    transactions: { keyPath: 'id', indexes: ['syncStatus', 'shiftId', 'completedAt'] },
    products:     { keyPath: 'id', indexes: ['sku', 'categoryId'] },
    carts:        { keyPath: 'id', indexes: ['status'] },
    syncQueue:    { keyPath: 'id', indexes: ['createdAt', 'retryCount'] },
  }
};
```

---

## Next.js App Router — Route Protection

```typescript
// app/(pos)/layout.tsx
export default async function PosLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session) redirect('/login');

  const shift = await getActiveShift(session.terminalId);
  if (!shift) redirect('/shift/open');

  return (
    <ShiftProvider shift={shift}>
      <PosShell>{children}</PosShell>
    </ShiftProvider>
  );
}
```

### Middleware for RBAC

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('pos-token');
  const { pathname } = request.nextUrl;

  if (!token && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const role = extractRole(token);
  if (!hasRoutePermission(role, pathname)) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}
```

---

## Security Design

| Concern | Implementation |
|---|---|
| Auth tokens | httpOnly cookies only — never localStorage |
| XSS prevention | DOMPurify on all user-rendered content |
| CSRF | SameSite=Strict cookies + custom header |
| CSP | `next.config.js` headers — strict-dynamic |
| Inactivity lock | `useInactivityLock` hook — 5 min timeout |
| Sensitive data masking | Role-based rendering in components |
| Input validation | Zod schemas at infrastructure boundary |
| Rate limiting | 5 failed attempts → 15 min lockout (server-enforced, UI reflects) |

---

## Observability Design

```typescript
// domain/ports/services/ILoggingService.ts
export interface LogContext {
  userId?: string;
  terminalId?: string;
  shiftId?: string;
  transactionId?: string;
  correlationId: string;
  [key: string]: unknown;
}

// infrastructure/adapters/services/SentryLoggingService.ts
export class SentryLoggingService implements ILoggingService {
  info(event: string, context: LogContext): void {
    Sentry.addBreadcrumb({ message: event, data: context, level: 'info' });
  }
  error(event: string, error: Error, context: LogContext): void {
    Sentry.captureException(error, { extra: { event, ...context } });
  }
}
```

---

## Property-Based Testing Strategy

Each use case will have PBT properties defined with `fast-check`:

| Module | Property |
|---|---|
| Money | `add(a, b).amount === a.amount + b.amount` for all non-negative integers |
| Cart totals | `total === subtotal + tax - discounts` for any combination of items |
| Discount | Applied discount never makes total negative |
| Split payment | Sum of all tenders always equals transaction total |
| Offline sync | All queued transactions are eventually synced in chronological order |
| RBAC | A cashier can never access admin-only permissions |

---

## Component Architecture (SRP)

Each component has a single responsibility:

- `ProductCard` — renders one product, emits `onSelect` event
- `CartPanel` — renders cart state, delegates mutations to `useCart` hook
- `CartTotals` — pure display of subtotal/tax/total, no side effects
- `CashTender` — handles cash input and change calculation only
- `OfflineBanner` — displays offline status and pending sync count only

No component directly imports a Use Case or Repository. All domain interactions go through custom hooks which consume the DI containers.

```
Component → Hook → Use Case (via DI) → Port → Adapter → External
```

---

## Key Architectural Decisions

1. **No direct API calls from components** — all data access goes through hooks → use cases → ports → adapters.
2. **Zod at the boundary** — all external data (API responses, localStorage reads) is validated with Zod before entering the domain.
3. **Money as value object** — all monetary calculations use the `Money` class (integer cents) to avoid floating-point errors.
4. **Immutable transactions** — once a `Transaction` is completed, it is never mutated; refunds create new `Refund` entities.
5. **Offline-first cart** — the cart state is always written to IndexedDB first, then synced to the server.
6. **Swappable adapters** — payment provider, print driver, logging provider, and chart library are all behind ports and can be swapped without touching domain code.

'use client';

import React from 'react';
import { ProductGrid } from '../../../features/pos/ProductGrid/ProductGrid';
import { CartPanel } from '../../../features/pos/CartPanel/CartPanel';
import { useCartStore } from '../../../adapters/state/cartStore';
import { Product } from '../../../core/entities/Product';

export default function SalePage() {
  const { actions } = useCartStore();

  const handleAddToCart = (product: Product, quantity: number) => {
    const state = useCartStore.getState();
    const cart = state.carts[state.activeCartId || 'default'];
    const existingItem = cart?.items?.find(i => i.productId === product.id);
    const currentQty = existingItem ? existingItem.quantity : 0;

    if (currentQty + quantity <= product.stock) {
      actions.addItem(product, quantity);
    } else {
      alert(`¡No puedes agregar más! Solo hay ${product.stock} unidades de ${product.name} en stock.`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar/Navigation would go here */}
      <div className="w-20 bg-gray-800 text-white flex flex-col items-center py-4">
        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl mb-8">
          POS
        </div>
        {/* Navigation icons */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex p-6 gap-6">
        {/* Left Side: Product Grid & Search */}
        <div className="flex-1 overflow-hidden">
          <ProductGrid onAddToCart={handleAddToCart} />
        </div>

        {/* Right Side: Cart Panel */}
        <div className="w-96 flex-shrink-0">
          <CartPanel />
        </div>
      </div>
    </div>
  );
}

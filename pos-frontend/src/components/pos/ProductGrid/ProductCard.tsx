import React from 'react';
import { Product } from '../../../domain/entities/Product';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock < 5;

  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format((product.price as any).amount);

  return (
    <div 
      className={`relative flex flex-col bg-white rounded-2xl p-5 shadow-md border border-gray-100 transition-all duration-300 ${isOutOfStock ? 'opacity-60 grayscale cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-lg cursor-pointer'}`}
      onClick={() => !isOutOfStock && onAdd(product)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase mb-1">{(product as any).categoryId}</span>
          <h3 className="font-bold text-lg text-gray-900 leading-tight">{product.name}</h3>
        </div>
        {isOutOfStock ? (
          <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full uppercase">Agotado</span>
        ) : isLowStock ? (
          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full uppercase">Pocas</span>
        ) : null}
      </div>
      
      <div className="mt-auto pt-4 flex flex-col gap-3">
        <div className="text-2xl font-black text-gray-900">
          {formattedPrice}
        </div>
        <div className="flex justify-between items-center text-xs font-medium text-gray-500">
          <span>Stock: <span className={isLowStock ? 'text-orange-600 font-bold' : ''}>{product.stock}</span></span>
          <span className="bg-gray-100 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-tighter">SKU: {String(product.sku)}</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useInventoryStore } from '../../stores/inventoryStore';

export const AdminDashboard: React.FC = () => {
  const { products } = useInventoryStore();
  const [activeTab, setActiveTab] = useState<'inventory' | 'reports' | 'users'>('inventory');

  const formatCOP = (val: number) => new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(val);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex border-b border-gray-200 bg-white px-8">
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`py-4 px-6 font-bold text-sm ${activeTab === 'inventory' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Inventario de Productos
        </button>
        <button 
          onClick={() => setActiveTab('reports')}
          className={`py-4 px-6 font-bold text-sm ${activeTab === 'reports' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Reportes de Ventas
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          className={`py-4 px-6 font-bold text-sm ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Gestión de Cajeros
        </button>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-black text-gray-900">Catálogo de Productos</h3>
              <button 
                onClick={() => {
                  const name = prompt('Nombre del nuevo producto:');
                  if (!name) return;
                  const priceStr = prompt('Precio en COP:');
                  if (!priceStr) return;
                  const newProduct = {
                    id: Math.random().toString(36).substr(2, 9),
                    sku: `SKU${Math.floor(Math.random() * 1000)}` as any,
                    name,
                    price: { amount: parseInt(priceStr) || 0, currency: 'COP' } as any,
                    stock: 10,
                    categoryId: 'c1',
                    variants: [],
                    isActive: true,
                    imageUrl: null,
                    unitOfMeasure: 'UND'
                  };
                  useInventoryStore.getState().addProduct(newProduct);
                }}
                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 text-sm"
              >
                + Nuevo Producto
              </button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-bold">SKU</th>
                  <th className="p-4 font-bold">Nombre</th>
                  <th className="p-4 font-bold">Categoría</th>
                  <th className="p-4 font-bold">Precio (COP)</th>
                  <th className="p-4 font-bold">Stock</th>
                  <th className="p-4 font-bold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm font-mono text-gray-600">{String(product.sku)}</td>
                    <td className="p-4 text-sm font-bold text-gray-900">{product.name}</td>
                    <td className="p-4 text-xs font-bold text-blue-600 uppercase tracking-widest">{(product as any).categoryId}</td>
                    <td className="p-4 text-sm font-medium text-gray-700">{formatCOP((product.price as any).amount)}</td>
                    <td className="p-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                        {product.stock} unds
                      </span>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => {
                          const newPrice = prompt('Nuevo precio en COP para ' + product.name + ':', String((product.price as any).amount));
                          if (newPrice !== null) {
                            useInventoryStore.getState().updateProduct({
                              ...product,
                              price: { amount: parseInt(newPrice) || 0, currency: 'COP' } as any
                            });
                          }
                        }}
                        className="text-blue-600 hover:text-blue-800 font-bold text-sm mr-4"
                      >
                        Editar Precio
                      </button>
                      <button 
                        onClick={() => {
                          const newStock = prompt('Nuevo stock para ' + product.name + ':', String(product.stock));
                          if (newStock !== null) {
                            useInventoryStore.getState().updateProduct({
                              ...product,
                              stock: parseInt(newStock) || 0
                            });
                          }
                        }}
                        className="text-amber-600 hover:text-amber-800 font-bold text-sm mr-4"
                      >
                        Editar Stock
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm('¿Seguro que deseas eliminar ' + product.name + '?')) {
                            useInventoryStore.getState().deleteProduct(product.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 font-bold text-sm"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="font-medium text-lg">Módulo de reportes en construcción.</p>
            <p className="text-sm">Aquí se conectará la API de ventas del backend.</p>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className="font-medium text-lg">Módulo de cajeros en construcción.</p>
            <p className="text-sm">Aquí podrás crear accesos y contraseñas para los vendedores.</p>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';

interface ProductSearchProps {
  onSearch: (query: string) => void;
  onBarcodeScan: (barcode: string) => void;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({ onSearch, onBarcodeScan }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  // Handle barcode scanner (fast input detection)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.length > 5) {
      // Treat as barcode if Enter is pressed and length is sufficient
      e.preventDefault();
      onBarcodeScan(query);
      setQuery('');
    }
  };

  return (
    <div className="w-full relative">
      <input
        ref={inputRef}
        type="text"
        className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 text-lg text-gray-900"
        placeholder="Buscar producto por nombre, SKU o escanear código de barras..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <div className="absolute right-4 top-4 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};

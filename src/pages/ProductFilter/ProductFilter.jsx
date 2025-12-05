import React from 'react';
import './ProductFilter.css';

export const ProductFilter = ({ onFilterChange }) => {
  return (
    <div className="product-filter">
      <input
        type="text"
        placeholder="Cerca prodotti..."
        onChange={(e) => onFilterChange(e.target.value)}
        className="product-filter-input"
      />
    </div>
  );
};

export default ProductFilter;


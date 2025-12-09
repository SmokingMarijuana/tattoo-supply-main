import React, { useState, useMemo } from 'react';
import './Products.css';
import ProductCard from '../ProductCard/ProductCard';
import { products } from '../../assets/assets.js';

export const Products = () => {
  // Flatten products array (rimuove il doppio array)
  const allProducts = products.flat();
  
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    brand: '',
    minPrice: '',
    maxPrice: ''
  });

  // Estrai valori unici per i filtri
  const types = useMemo(() => {
    const uniqueTypes = [...new Set(allProducts.map(p => p.type))];
    return uniqueTypes.filter(Boolean);
  }, [allProducts]);

  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(allProducts.map(p => p.brand).filter(Boolean))];
    return uniqueBrands.sort();
  }, [allProducts]);

  // Filtra i prodotti
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Filtro ricerca
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!product.name.toLowerCase().includes(searchLower) &&
            !(product.brand && product.brand.toLowerCase().includes(searchLower))) {
          return false;
        }
      }

      // Filtro tipo
      if (filters.type && product.type !== filters.type) {
        return false;
      }

      // Filtro brand
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }

      // Filtro prezzo minimo
      if (filters.minPrice && product.price_usd < parseFloat(filters.minPrice)) {
        return false;
      }

      // Filtro prezzo massimo
      if (filters.maxPrice && product.price_usd > parseFloat(filters.maxPrice)) {
        return false;
      }

      return true;
    });
  }, [allProducts, filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      type: '',
      brand: '',
      minPrice: '',
      maxPrice: ''
    });
  };

  return (
    <div className="products-page">
      {/* Sidebar Filtri */}
      <aside className="products-sidebar">
        <div className="sidebar-content">
          <h1 className="sidebar-title">Filtri</h1>
          
          {/* Ricerca */}
          <div className="filter-group">
            <label className="filter-label">Cerca</label>
            <input
              type="text"
              className="filter-input"
              placeholder="Nome prodotto..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          {/* Tipo */}
          <div className="filter-group">
            <label className="filter-label">Tipo</label>
            <select
              className="filter-select"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">Tutti i tipi</option>
              {types.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div className="filter-group">
            <label className="filter-label">Brand</label>
            <select
              className="filter-select"
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
            >
              <option value="">Tutti i brand</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Prezzo Minimo */}
          <div className="filter-group">
            <label className="filter-label">Prezzo Min (€)</label>
            <input
              type="number"
              className="filter-input"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          {/* Prezzo Massimo */}
          <div className="filter-group">
            <label className="filter-label">Prezzo Max (€)</label>
            <input
              type="number"
              className="filter-input"
              placeholder="1000"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          {/* Reset Button */}
          <button className="filter-reset-btn" onClick={resetFilters}>
            Reset Filtri
          </button>

          {/* Contatore risultati */}
          <div className="filter-results-count">
            {filteredProducts.length} prodotto{filteredProducts.length !== 1 ? 'i' : ''} trovato{filteredProducts.length !== 1 ? 'i' : ''}
          </div>
        </div>
      </aside>

      {/* Area principale con card */}
      <div className="products-main-content">
        <div className="products-container">
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product._id}
                  image={product.image || 'https://via.placeholder.com/300x220?text=No+Image'}
                  title={product.name}
                  brand={product.brand || 'N/A'}
                  price={product.price_usd?.toFixed(2) || '0.00'}
                />
              ))}
            </div>
          ) : (
            <div className="products-empty">
              Nessun prodotto trovato con i filtri selezionati.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
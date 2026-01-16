import React, { useState, useEffect } from 'react';
import { getAllProductsAdmin, deleteProduct } from '../../services/apiCalls';
import './ProductsAdmin.css';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import ProductList from './ProductList';

export const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('list'); // 'list', 'add', 'edit'
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Carica i prodotti
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllProductsAdmin(null);
      setProducts(response.data);
    } catch (err) {
      console.error('Errore nel caricamento dei prodotti:', err);
      setError('Errore nel caricamento dei prodotti');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      try {
        await deleteProduct(id, null);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        console.error('Errore nel caricamento del prodotto:', err);
        setError('Errore nell\'eliminazione del prodotto');
      }
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setMode('edit');
  };

  const handleAddProductClick = () => {
    setSelectedProduct(null);
    setMode('add');
  };

  const handleBackToList = () => {
    setMode('list');
    setSelectedProduct(null);
    fetchProducts();
  };

  return (
    <div className="products-admin-container">
      <div className="products-admin-header">
        <h1>Gestione Prodotti</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      {mode === 'list' && (
        <>
          <button className="btn btn-primary add-product-btn" onClick={handleAddProductClick}>
            + Aggiungi Prodotto
          </button>
          {loading ? (
            <div className="loading">Caricamento...</div>
          ) : (
            <ProductList 
              products={products}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          )}
        </>
      )}

      {mode === 'add' && (
        <AddProduct token={null} onSuccess={handleBackToList} />
      )}

      {mode === 'edit' && (
        <EditProduct 
          product={selectedProduct}
          token={null} 
          onSuccess={handleBackToList}
        />
      )}
    </div>
  );
};


export default ProductList;

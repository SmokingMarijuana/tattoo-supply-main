import React, { useState } from 'react';
import { createProduct } from '../../services/apiCalls';
import './AddProduct.css';

const AddProduct = ({ token, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
    image_url: '',
    is_active: true,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validazione
    if (!formData.name || !formData.category || !formData.price) {
      setError('I campi Nome, Categoria e Prezzo sono obbligatori');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
      };

      await createProduct(productData, token);
      onSuccess();
    } catch (err) {
      console.error('Errore nella creazione del prodotto:', err);
      setError('Errore nella creazione del prodotto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-header">
        <h2>Aggiungi Nuovo Prodotto</h2>
        <button className="btn-back" onClick={onSuccess}>← Indietro</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Nome *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome del prodotto"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria *</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="es. Inchiostro, Macchinette, Accessori"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="brand">Marca</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Marca del prodotto"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Prezzo (€) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Quantità in Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="0"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image_url">URL Immagine</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />
          <label htmlFor="is_active">Prodotto Attivo</label>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Aggiunta in corso...' : 'Aggiungi Prodotto'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onSuccess}
          >
            Annulla
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

import React from 'react';
import './ProductList.css';

const ProductList = ({ products, onEdit, onDelete }) => {
  const handleRowClick = (product, e) => {
    // Non entrare in modifica se clicchi sui bottoni di azione
    if (e.target.closest('.product-actions')) {
      return;
    }
    onEdit(product);
  };

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>Nessun prodotto trovato. Crea il tuo primo prodotto!</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-list-table-wrapper">
        <table className="product-list-table">
          <thead>
            <tr>
              <th>Immagine</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Marca</th>
              <th>Prezzo</th>
              <th>Stock</th>
              <th>Stato</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr 
                key={product._id} 
                className={`product-row ${!product.is_active ? 'inactive' : ''}`}
                onClick={(e) => handleRowClick(product, e)}
              >
                <td className="product-image">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </td>
                <td className="product-name">{product.name}</td>
                <td>{product.category}</td>
                <td>{product.brand || '-'}</td>
                <td className="product-price">€{parseFloat(product.price).toFixed(2)}</td>
                <td className="product-stock">
                  <span className={product.stock <= 5 ? 'low-stock' : ''}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <span className={`status ${product.is_active ? 'active' : 'inactive'}`}>
                    {product.is_active ? 'Attivo' : 'Inattivo'}
                  </span>
                </td>
                <td className="product-actions">
                  <button
                    className="btn btn-sm btn-edit"
                    onClick={() => onEdit(product)}
                    title="Modifica"
                  >
                    ✎ Modifica
                  </button>
                  <button
                    className="btn btn-sm btn-delete"
                    onClick={() => onDelete(product._id)}
                    title="Elimina"
                  >
                    🗑 Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;

import React, { useState, useEffect } from 'react';
import './Cart.css';
import axios from 'axios';
import { getCart, removeFromCart, addToCart, setCart } from '../../services/cart';
import { Link, useNavigate } from 'react-router-dom';

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* Fetch di TUTTI i prodotti dal database */
  useEffect(() => {
    axios.get('http://localhost:5000/api/products/all')
      .then(res => setAllProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  /* Funzione helper per arricchire il carrello */
  const enrichCart = (products) => {
    const cart = getCart();
    return cart.map(cartItem => {
      const product = products.find(p => p._id.toString() === cartItem.id.toString());
      return {
        ...cartItem,
        ...product
      };
    }).filter(item => item.name);
  };

  /* Carica il carrello e aggiorna quando cambia allProducts */
  useEffect(() => {
    if (allProducts.length > 0) {
      const enrichedCart = enrichCart(allProducts);
      setCartItems(enrichedCart);
      setLoading(false);
    }
  }, [allProducts]);

  /* Listener per aggiornamenti del carrello */
  useEffect(() => {
    const handleCartUpdate = () => {
      const enrichedCart = enrichCart(allProducts);
      setCartItems(enrichedCart);
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, [allProducts]);

  const handleQuantityChange = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      const cart = getCart();
      const item = cart.find(i => i.id === productId);
      if (item) {
        item.qty = newQty;
        setCart(cart);
      }
    }
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * (item.qty || 1));
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    alert('Pagamenti ancora in implementazione');
    // TODO: Implementare la pagina di checkout
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="cart-loading">Caricamento...</div>;
  }

  return (
    <div className="cart-page">
      

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <div className="empty-icon">🎨</div>
          <h2>Il tuo carrello è vuoto</h2>
          <p>Scopri i nostri inchiostri di qualità premium</p>
          <Link to="/inchiostro" className="continue-shopping-btn">
            Continua lo shopping
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items-section">
            <h2 className="section-title">Prodotti nel carrello</h2>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image_url} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-title">{item.name}</h3>
                    <p className="item-price">€ {parseFloat(item.price).toFixed(2)}</p>
                  </div>

                  <div className="item-quantity">
                    <label>Quantità:</label>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleQuantityChange(item.id, (item.qty || 1) - 1)}
                        className="qty-btn"
                      >
                        −
                      </button>
                      <input 
                        type="number" 
                        value={item.qty || 1}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        className="qty-input"
                        min="1"
                      />
                      <button 
                        onClick={() => handleQuantityChange(item.id, (item.qty || 1) + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-subtotal">
                    <p className="subtotal-label">Subtotale</p>
                    <p className="subtotal-price">€ {(parseFloat(item.price) * (item.qty || 1)).toFixed(2)}</p>
                  </div>

                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="remove-btn"
                    title="Rimuovi dal carrello"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>


            {/* DEVE DIVENTARE CONDIZIONALE LA PAGINA DI RITORNO */}
            <Link to="/inchiostro" className="continue-btn">
              Continua lo shopping
            </Link>
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Riepilogo ordine</h2>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotale:</span>
                <span>€ {calculateTotal()}</span>
              </div>
              <div className="summary-row">
                <span>Spedizione:</span>
                <span className="shipping">Gratuita</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Totale:</span>
                <span>€ {calculateTotal()}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="checkout-btn"
            >
              Procedi al checkout
            </button>

            <button 
              onClick={handleGoBack}
              className="back-btn"
            >
              ← Torna indietro
            </button>

            <div className="payment-methods">
              <p className="methods-title">Metodi di pagamento accettati:</p>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

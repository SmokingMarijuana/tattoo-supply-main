import React, { useState } from 'react'
import './ProductDetail.css'
import { useLocation } from 'react-router-dom';

export const ProductDetail = () => {
    const location = useLocation();
    const { image } = location.state || {};
    const [quantity, setQuantity] = useState(1);

    const increase = () => setQuantity(prev => prev + 1);
    const decrease = () => setQuantity(prev => Math.max(0, prev - 1));

    return (
        <div className="container">
            <div className="title"></div>
            <div className="detail">
                <div className="image">
                    <img src={immagine} alt="Prodotto" />
                </div>
                <div className="content">
                    <h1 className="name"></h1>
                    <div className="price"></div>

                    <div className="quantity">
                        <label>QUANTITÀ</label>
                        <div className="quantity-buttons">
                            <button className="q-btn" onClick={decrease}>-</button>
                            <span className="q-value">{quantity}</span>
                            <button className="q-btn" onClick={increase}>+</button>
                        </div>
                    </div>

                    <div className="buttons">
                        <button>Check Out</button>
                        <button>
                            Aggiungi al carrello
                            <span>
                                <svg className="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;

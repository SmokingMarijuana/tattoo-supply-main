import React from 'react'
import './InkCard.css'

export const InkCard = ({ image, title, price }) => {
  return (
    <div className="ink-card">
      <div className="ink-card-image-wrapper">
        <img 
          src={image || 'https://via.placeholder.com/300x400?text=Product'} 
          alt={title || 'Product'} 
          className="ink-card-image"
        />
      </div>
      <div className="ink-card-content">
        <h3 className="ink-card-title">{title || 'Product Name'}</h3>
        <p className="ink-card-price">${price || '0.00'}</p>
      </div>
    </div>
  )
}

export default InkCard
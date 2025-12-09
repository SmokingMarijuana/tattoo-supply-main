import React from 'react'
import './HomeCard.css'
const placeholder = "https://placehold.co/250x150";

export const HomeCard = () => {
  return (
    
<div className="card">
  <img src={placeholder} alt="Product Image" />
  <div className="card-body">
    <div className="card-title">Inchiostro nero</div>
    <div className="card-subtitle">Cheyenne</div>
    
    <div className="card-price">€49.99</div>
    <a href="#" className="card-button">Buy</a>
  </div>
</div>
)
  
}

export default HomeCard;
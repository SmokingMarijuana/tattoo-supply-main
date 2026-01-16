import React from 'react'
import './CategoryCard.css'
import { useNavigate } from 'react-router-dom'

export const CategoryCard = ({ 
  title = "INCHIOSTRO", 
  imageUrl = "https://images.pexels.com/photos/4123711/pexels-photo-4123711.jpeg",
  path = "/" 
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(path);
    window.scrollTo(0, 0);
  };
  
  return (
    <div 
      className="card" 
      style={{ '--bg-image': `url(${imageUrl})` }}
      onClick={handleClick}
    >
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  )
}

export default CategoryCard;
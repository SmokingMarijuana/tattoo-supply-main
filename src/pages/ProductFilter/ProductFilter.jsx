import React from 'react'
import './ProductFilter.css'

export const ProductFilter = () => {
  return (
    <div className="sidebar-wrapper">
      <h1>ProductFilter</h1>
      <ul>
        <li><button>Filtra per categoria</button></li>
        <li><button>Filtra per marchio</button></li>
      </ul>
    </div>
  )
}

export default ProductFilter;

import React, { useState, useMemo } from 'react'
import './Inchiostro.css'
import InkCard from '../../common/InkCard/InkCard';

// Example products data - replace with your actual data source
const exampleProducts = [
  {
    id: 1,
    title: 'Intenze True Black - 30ml',
    price: '28.50',
    brand: 'Intenze',
    color: 'Black',
    image: 'https://tattoosupplyroma.it/12617-large_default/true-black-intenze-gen-z-30ml-colore-tattoo-reach.jpg'
  },
  {
    id: 2,
    title: 'Eternal Ink - White 30ml',
    price: '24.90',
    brand: 'Eternal',
    color: 'White',
    image: 'https://www.shoppingtattoo.it/wp-content/uploads/2024/04/eternal_ink_e31_white_1oz_w.jpeg'
  },
  {
    id: 3,
    title: 'World Famous - Red Dragon 30ml',
    price: '32.00',
    brand: 'World Famous',
    color: 'Red',
    image: 'https://www.shoppingtattoo.it/wp-content/uploads/2023/08/lthr1-world-famous-limitless-hot_red-1oz_1.jpg'
  },
  {
    id: 4,
    title: 'Fusion Ink - Royal Blue 30ml',
    price: '26.50',
    brand: 'Fusion',
    color: 'Blue',
    image: 'https://dynamiccolor.com/cdn/shop/files/fusion-sahara-tan-1oz-front.jpg?v=1748536685&width=1420'
  },
  {
    id: 5,
    title: 'Dynamic Color - Yellow 30ml',
    price: '29.90',
    brand: 'Dynamic Color',
    color: 'Yellow',
    image: 'https://www.shoppingtattoo.it/wp-content/uploads/2022/04/dynamic30-pl-sunfloyel_dynamic_tattoo_ink_-_platinum_-_sunflower_yellow_30ml_eu_reach_version_.jpg'
  },
  {
    id: 6,
    title: 'Kuro Sumi - Sumi Black 30ml',
    price: '35.00',
    brand: 'Kuro Sumi',
    color: 'Black',
    image: 'https://www.killerinktattoo.it/media/catalog/product/cache/f8158826193ba5faa8b862a9bd1eb9e9/k/s/ks-imperial-demon-black_1.jpg'
  }
];

export const Inchiostro = () => {
  const [sortBy, setSortBy] = useState('default');

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...exampleProducts];
    
    if (sortBy === 'price-low') {
      products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === 'price-high') {
      products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    return products;
  }, [sortBy]);

  return (
    <div className="inchiostro-page">
      <div className="inchiostro-header">
        <h1 className="inchiostro-title">Inchiostri</h1>
        
      </div>

      {/* Dropdown per ordinare */}
      <div className="inchiostro-sort-container">
        <label className="sort-label">Ordina per:</label>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Predefinito</option>
          <option value="price-low">Prezzo, Da basso a alto</option>
          <option value="price-high">Prezzo, Da alto a basso</option>
        </select>
      </div>

      {/* Container prodotti */}
      <div className="inchiostro-container">
        {sortedProducts.map((product, index) => (
          <div 
            key={product.id} 
            className="ink-card-wrapper"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <InkCard
              image={product.image}
              title={product.title}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Inchiostro;
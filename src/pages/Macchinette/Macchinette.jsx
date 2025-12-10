import React, { useState, useMemo } from 'react'
import './Macchinette.css'
import InkCard from '../../common/InkCard/InkCard';

// Example products data - replace with your actual data source
const exampleProducts = [
  {
    id: 1,
    title: 'Cheyenne Hawk Pen - Black',
    price: '499.00',
    brand: 'Cheyenne',
    color: 'Black',
    image: 'https://www.maxsignorello.it/wp-content/uploads/2022/06/cheyenne-hawk-pen-optimized.jpg'
  },
  {
    id: 2,
    title: 'Bishop Rotary Wand Shader',
    price: '649.00',
    brand: 'Bishop',
    color: 'Black',
    image: 'https://www.maxsignorello.it/wp-content/uploads/2022/06/bispws-p3_1-optimized.jpg'
  },
  {
    id: 3,
    title: 'FK Irons Spektra Xion Rotary',
    price: '750.00',
    brand: 'FK Irons',
    color: 'Red',
    image: 'https://goldeneedle.it/cdn/shop/products/Xion_RubyBody-4_2000x_f7fed7c5-1d85-4658-b9b7-c03e7b3e64db_1080x.png?v=1700056186'
  },
  {
    id: 4,
    title: 'Inkjecta Flite Nano Lite',
    price: '420.00',
    brand: 'Inkjecta',
    color: 'Blue',
    image: 'https://inkjecta.com/cdn/shop/files/inkjecta-flite-nano-lite-stealth-1-ij-min_f743bc2d-7ad5-448e-a748-b6b2dbd81f67.jpg?v=1689152277&width=1200'
  },
  {
    id: 5,
    title: 'Stigma Rotary Force Wireless',
    price: '890.00',
    brand: 'Stigma',
    color: 'Black',
    image: 'https://stigma-rotary.com/cdn/shop/products/XL-1_blk.jpg?v=1681481569&width=1500'
  },
  {
    id: 6,
    title: 'Dragonhawk Mast Archer Wireless',
    price: '259.00',
    brand: 'Dragonhawk',
    color: 'Black',
    image: 'https://dragonhawkofficial.com/wp-content/uploads/2023/08/WQP-010-20.jpg'
  }

];

export const Macchinette = () => {
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
        <h1 className="inchiostro-title">Macchinette</h1>

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
export default Macchinette;
import React from 'react'
import './ProductList.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export const ProductList = ({ products }) => {
  const sample = [
    { id: 1, img: '../src/assets/ink.png', name: "CARTUCCE" },
    { id: 2, img: '../src/assets/ink.png', name: "INCHOSTRO" },
    { id: 3, img: '../src/assets/ink.png', name: "SET" },
  ]

  const list = products && products.length ? products : sample

  return (
    <section className="product-list bg-grey">
      <div className="container py-5">
        <h1 className="text-center mb-5">Categorie</h1>

        <div className="row">
          {list.map((p, idx) => (
            <div key={p.id || idx} className="col-lg-4 col-md-6 mb-4">
              <div className="product-card rounded shadow-sm">
                <img src={p.img} alt={`product-${p.id || idx}`} className="w-100" />
                  <div className = "overlay">
                    <span className = "category-name">{p.name}</span>
                  </div>
                  <a className="product-link"></a>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductList

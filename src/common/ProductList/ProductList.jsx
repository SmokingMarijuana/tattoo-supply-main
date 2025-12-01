import React from 'react'
import './ProductList.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export const ProductList = ({ products }) => {
  const sample = [
    { id: 1, img: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(1).webp', price: 123 },
    { id: 2, img: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(2).webp', price: 239 },
    { id: 3, img: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(3).webp', price: 147 },
    { id: 4, img: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp', price: 83 },
    { id: 5, img: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(5).webp', price: 106 },
    { id: 6, img: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(6).webp', price: 58 },
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
                <a href="#!" className="product-link">
                  <div className="mask price-mask">
                    <div className="d-flex justify-content-start align-items-start h-100">
                      <h5>
                        <span className="badge price-badge">${p.price}</span>
                      </h5>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductList

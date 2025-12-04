import React, { useState, useEffect } from "react";
import "./Products.css";
import "../../common/ProductList/ProductList.css";
import { getAllProducts } from "../../services/apiCalls";
import ProductCard from "../ProductCard/ProductCard";
import ProductFilter from "../ProductFilter/ProductFilter";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error("Errore nel fetching dei prodotti:", err);
        setError("Errore nel caricamento dei prodotti");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (

    <div className="products-body">
      <div className="products-header">
        <h1 className="products-title">I nostri prodotti</h1>
      </div>
    <ProductFilter />

      {loading && <div className="products-loading">Caricamento prodotti...</div>}
      {error && <div className="products-error">{error}</div>}

      {!loading && products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.nome} image="src\assets\ink.png"
                title= {product.nome}
                brand= {product.brand}
                price= {product.prezzo}
            />
          ))}
        </div>
      )}

      {!loading && products.length === 0 && !error && (
        <div className="products-empty">Nessun prodotto disponibile</div>
      )}
    </div>
  );
};

export default Products;
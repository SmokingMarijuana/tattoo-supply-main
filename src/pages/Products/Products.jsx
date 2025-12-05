import React, { useState, useEffect } from "react";
import "./Products.css";
import "../../common/ProductList/ProductList.css";
import { getAllProducts } from "../../services/apiCalls";
import ProductCard from "../ProductCard/ProductCard";
import ProductFilter from "../ProductFilter/ProductFilter";
import Sidebar from "../../common/Sidebar/Sidebar";
import inkImage from "../../assets/ink.png";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        setProducts(response.data || []);
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

  const handleFilterChange = (value) => {
    setSearchTerm(value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products
    .filter((product) =>
      product.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

  const renderContent = () => {
    if (loading) {
      return <div className="products-loading">Caricamento prodotti...</div>;
    }

    if (error) {
      return <div className="products-error">{error}</div>;
    }

    if (products.length === 0) {
      return <div className="products-empty">Nessun prodotto disponibile</div>;
    }

    if (filteredProducts.length === 0) {
      return <div className="products-empty">Nessun prodotto corrisponde alla ricerca.</div>;
    }

    return (
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id || product.nome}
            image={product.image || inkImage}
            title={product.nome}
            brand={product.brand}
            price={product.prezzo}
          />
        ))}
      </div>
    );
  };

  return (
    
    <div className="products-page">
      
      <Sidebar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
      <div className="products-main-content">
        <div className="products-header">
        </div>
        <ProductFilter onFilterChange={handleFilterChange} />
        <div className="products-container">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Products;
import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductDetailAmazon.css";

export default function ProductDetailAmazon({ product }) {
  const { addToCart } = useContext(CartContext);
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="product-detail-amazon">
      <div className="product-gallery">
        <img
          src={mainImage}
          alt={product.title}
          className="main-image"
          onMouseOver={e => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
        />
        <div className="thumbnails">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx+1}`}
              onClick={() => setMainImage(img)}
              className={mainImage === img ? "active-thumb" : ""}
            />
          ))}
        </div>
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.title}</h1>
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <span className="star" key={i}>
              {i < product.rating ? "★" : "☆"}
            </span>
          ))}
          <span className="rating-count">({product.ratingCount})</span>
        </div>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <div className="product-description">{product.description}</div>
      </div>
      <div className="purchase-box">
        <div className="purchase-price">${product.price.toFixed(2)}</div>
        <div className="stock-status" style={{color: product.inStock ? '#28a745' : '#ff3e3e'}}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
        <button
          className="add-to-cart-btn"
          disabled={!product.inStock}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        <button
          className="buy-now-btn"
          disabled={!product.inStock}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

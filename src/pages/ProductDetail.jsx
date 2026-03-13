import { useState } from 'react';
import { useCart } from '../context/CartContext';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

const renderStars = (rating) =>
  [...Array(5)].map((_, i) => (i + 0.5 <= rating ? '★' : '☆')).join('');

function ProductDetail({ productId, onNavigate }) {
  const product = products.find((p) => p.id === productId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="page-main">
        <div className="not-found">
          <span>😕</span>
          <h2>Product not found</h2>
          <button className="btn-primary" onClick={() => onNavigate('products', null)}>
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="page-main">
      <button className="back-btn" onClick={() => onNavigate('products', null)}>
        ← Back to Products
      </button>

      <div className="detail-container">
        <div className="detail-image-wrap">
          <img
            src={product.image}
            alt={product.name}
            className="detail-image"
          />
        </div>

        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-name">{product.name}</h1>

          <div className="detail-rating">
            <span className="stars large">{renderStars(product.rating)}</span>
            <span className="rating-val">{product.rating}</span>
            <span className="rating-count">({product.reviews} reviews)</span>
          </div>

          <p className="detail-price">${product.price.toFixed(2)}</p>

          <p className="detail-description">{product.description}</p>

          <div className="detail-actions">
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              className={`add-to-cart-btn large ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
          </div>

          <div className="detail-badges">
            <div className="detail-badge">🚚 Free shipping over $50</div>
            <div className="detail-badge">↩️ 30-day returns</div>
            <div className="detail-badge">🔒 Secure checkout</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related-section">
          <h2>You May Also Like</h2>
          <div className="products-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductDetail;

import { useEffect } from 'react';
import { useCart } from '../context/CartContext';

const renderStars = (rating) =>
  [...Array(5)].map((_, i) => (i + 0.5 <= rating ? '★' : '☆')).join('');

function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !product) {
    return null;
  }

  return (
    <div className="quick-view-overlay" onClick={onClose} role="presentation">
      <div
        className="quick-view-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Product quick view"
      >
        <button type="button" className="quick-view-close" onClick={onClose}>
          ✕
        </button>

        <div className="quick-view-grid">
          <div className="quick-view-image-wrap">
            <img src={product.image} alt={product.name} className="quick-view-image" />
          </div>

          <div className="quick-view-content">
            <p className="quick-view-category">{product.category}</p>
            <h3 className="quick-view-name">{product.name}</h3>
            <div className="quick-view-rating">
              <span className="stars">{renderStars(product.rating)}</span>
              <span className="rating-val">{product.rating}</span>
              <span className="rating-count">({product.reviews} reviews)</span>
            </div>
            <p className="quick-view-price">${product.price.toFixed(2)}</p>
            <p className="quick-view-description">{product.description}</p>

            <button
              type="button"
              className="add-to-cart-btn large"
              onClick={() => addToCart(product, 1)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;

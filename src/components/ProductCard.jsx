import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const renderStars = (rating) =>
  [...Array(5)].map((_, i) => (i + 0.5 <= rating ? '★' : '☆')).join('');

function ProductCard({ product, onNavigate, onQuickView }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const discountPercent = 10 + ((product.id * 7) % 21);
  const originalPrice = product.price / (1 - discountPercent / 100);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    onQuickView?.(product);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="product-card"
      onClick={() => onNavigate('product', product.id)}
    >
      <div className="product-img-wrap">
        <button
          type="button"
          className={`wishlist-heart ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wishlisted ? '❤' : '♡'}
        </button>
        <span className="discount-badge">-{discountPercent}%</span>
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />

        <div className="product-hover-actions">
          <button className="quick-view-btn" onClick={handleQuickView}>
            Quick View
          </button>
          <button className="add-to-cart-btn card-cta" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="product-info">
        <p className="product-category-text">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span className="reviews">({product.reviews})</span>
        </div>
        <div className="product-price-row">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-old-price">${originalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

import { useCart } from '../context/CartContext';

const renderStars = (rating) =>
  [...Array(5)].map((_, i) => (i + 0.5 <= rating ? '★' : '☆')).join('');

function ProductCard({ product, onNavigate }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      className="product-card"
      onClick={() => onNavigate('product', product.id)}
    >
      <div className="product-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />
        <span className="product-category-badge">{product.category}</span>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span className="reviews">({product.reviews})</span>
        </div>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

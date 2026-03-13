import { useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import products from '../data/products';

function WishlistPage({ onNavigate }) {
  const { wishlistIds, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlistProducts = useMemo(() => {
    const byId = new Map(products.map((product) => [product.id, product]));
    return wishlistIds.map((id) => byId.get(id)).filter(Boolean);
  }, [wishlistIds]);

  if (wishlistProducts.length === 0) {
    return (
      <main className="page-main">
        <h1 className="page-title">Your Wishlist</h1>
        <div className="empty-cart">
          <div className="empty-cart-icon">💖</div>
          <h2>Your wishlist is empty</h2>
          <p>Save products you love to find them quickly later.</p>
          <button className="btn-primary" onClick={() => onNavigate('products', null)}>
            Browse Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-main">
      <h1 className="page-title">Your Wishlist ({wishlistProducts.length})</h1>

      <div className="wishlist-grid">
        {wishlistProducts.map((product) => (
          <article key={product.id} className="wishlist-card">
            <button
              type="button"
              className="wishlist-remove"
              onClick={() => removeFromWishlist(product.id)}
            >
              Remove
            </button>

            <button
              type="button"
              className="wishlist-image-btn"
              onClick={() => onNavigate('product', product.id)}
            >
              <img src={product.image} alt={product.name} className="wishlist-image" />
            </button>

            <div className="wishlist-content">
              <p className="wishlist-category">{product.category}</p>
              <h3 className="wishlist-name">{product.name}</h3>
              <p className="wishlist-price">${product.price.toFixed(2)}</p>
              <div className="wishlist-actions">
                <button
                  type="button"
                  className="btn-outline wishlist-outline"
                  onClick={() => onNavigate('product', product.id)}
                >
                  View Details
                </button>
                <button
                  type="button"
                  className="btn-primary wishlist-primary"
                  onClick={() => addToCart(product, 1)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default WishlistPage;

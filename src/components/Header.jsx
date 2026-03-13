import { useCart } from '../context/CartContext';

function Header({ currentPage, onNavigate }) {
  const { cartCount } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => onNavigate('home')}>
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">ShopZone</span>
        </div>

        <nav className="nav">
          <button
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentPage === 'products' ? 'active' : ''}`}
            onClick={() => onNavigate('products', null)}
          >
            Products
          </button>
        </nav>

        <button className="cart-btn" onClick={() => onNavigate('cart')}>
          <span className="cart-icon">🛒</span>
          <span className="cart-text">Cart</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}

export default Header;

import { useEffect, useMemo, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import products from '../data/products';

const MAX_SUGGESTIONS = 6;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightMatch(text, query) {
  if (!query.trim()) {
    return text;
  }

  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, 'gi'));
  return parts.map((part, index) => {
    const isMatch = part.toLowerCase() === query.toLowerCase();
    return isMatch ? (
      <mark key={`${part}-${index}`} className="search-highlight">
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    );
  });
}

function Header({ currentPage, onNavigate, onCartClick }) {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef(null);

  const suggestions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return [];
    }

    return products
      .filter((product) => product.name.toLowerCase().includes(normalized))
      .slice(0, MAX_SUGGESTIONS);
  }, [query]);

  const showDropdown = isOpen && query.trim().length > 0;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelectProduct = (productId) => {
    onNavigate('product', productId);
    setIsOpen(false);
    setActiveIndex(-1);
    setQuery('');
  };

  const handleInputKeyDown = (event) => {
    if (!showDropdown) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : suggestions.length - 1
      );
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (suggestions.length === 0) {
        return;
      }

      const selected =
        activeIndex >= 0 ? suggestions[activeIndex] : suggestions[0];
      handleSelectProduct(selected.id);
      return;
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setActiveIndex(-1);
    setIsOpen(true);
  };

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
          <button
            className={`nav-link ${currentPage === 'account' ? 'active' : ''}`}
            onClick={() => onNavigate('account')}
          >
            Account
          </button>
        </nav>

        <div className="navbar-search" ref={searchRef}>
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search products..."
            value={query}
            onChange={handleQueryChange}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleInputKeyDown}
            aria-label="Search products"
            aria-expanded={showDropdown}
            aria-autocomplete="list"
          />

          {showDropdown && (
            <div className="search-dropdown" role="listbox">
              {suggestions.length > 0 ? (
                suggestions.map((product, index) => (
                  <button
                    key={product.id}
                    type="button"
                    className={`search-item ${
                      index === activeIndex ? 'active' : ''
                    }`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelectProduct(product.id)}
                    role="option"
                    aria-selected={index === activeIndex}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="search-item-img"
                    />
                    <div className="search-item-info">
                      <p className="search-item-name">
                        {highlightMatch(product.name, query)}
                      </p>
                      <p className="search-item-price">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="search-no-results">No results found</p>
              )}
            </div>
          )}
        </div>

        <div className="header-actions">
          <button className="cart-btn" onClick={onCartClick}>
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button className="wishlist-btn" onClick={() => onNavigate('wishlist')}>
            <span className="wishlist-icon">❤</span>
            <span className="wishlist-text">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="wishlist-badge">{wishlistCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

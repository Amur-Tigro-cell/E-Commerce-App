function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">🛍️ ShopZone</span>
          <p>Your one-stop destination for electronics, fashion, home essentials, and more.</p>
        </div>

        <div className="footer-links">
          <h4>Shop</h4>
          <button onClick={() => onNavigate('home')}>Home</button>
          <button onClick={() => onNavigate('products', null)}>All Products</button>
          <button onClick={() => onNavigate('cart')}>Cart</button>
        </div>

        <div className="footer-links">
          <h4>Categories</h4>
          <button onClick={() => onNavigate('products', 'Electronics')}>Electronics</button>
          <button onClick={() => onNavigate('products', 'Clothing')}>Clothing</button>
          <button onClick={() => onNavigate('products', 'Home & Living')}>Home &amp; Living</button>
          <button onClick={() => onNavigate('products', 'Sports')}>Sports</button>
        </div>

        <div className="footer-links">
          <h4>Help</h4>
          <span>FAQ</span>
          <span>Shipping Policy</span>
          <span>Returns &amp; Exchanges</span>
          <span>Contact Us</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ShopZone. All rights reserved. Built with React + Vite.</p>
      </div>
    </footer>
  );
}

export default Footer;

import { useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import products from '../data/products';

const NAV_ITEMS = [
  { key: 'orders', label: 'My Orders', icon: '📦' },
  { key: 'wishlist', label: 'Wishlist', icon: '💖' },
  { key: 'addresses', label: 'Saved Addresses', icon: '📍' },
  { key: 'profile', label: 'Profile Settings', icon: '👤' },
];

const ORDER_DATA = [
  {
    id: 'ORD-10291',
    date: 'Mar 02, 2026',
    total: 129.99,
    status: 'Shipped',
    items: 2,
  },
  {
    id: 'ORD-10188',
    date: 'Feb 21, 2026',
    total: 49.99,
    status: 'Delivered',
    items: 1,
  },
  {
    id: 'ORD-10127',
    date: 'Feb 03, 2026',
    total: 244.50,
    status: 'Processing',
    items: 4,
  },
];

const ADDRESS_DATA = [
  {
    id: 1,
    tag: 'Home',
    name: 'Alex Morgan',
    line1: '148 Ocean Street',
    city: 'Los Angeles, CA 90015',
    phone: '+1 (323) 555-0155',
    isDefault: true,
  },
  {
    id: 2,
    tag: 'Office',
    name: 'Alex Morgan',
    line1: '212 Market Avenue, Suite 8',
    city: 'San Diego, CA 92101',
    phone: '+1 (619) 555-0109',
    isDefault: false,
  },
];

function AccountDashboard({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('orders');
  const { wishlistIds, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlistProducts = useMemo(() => {
    const byId = new Map(products.map((product) => [product.id, product]));
    return wishlistIds.map((id) => byId.get(id)).filter(Boolean);
  }, [wishlistIds]);

  return (
    <main className="page-main">
      <div className="account-header">
        <h1>My Account</h1>
        <p>Manage orders, addresses, wishlist, and profile settings in one place.</p>
      </div>

      <div className="account-layout">
        <aside className="account-sidebar">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`account-nav-btn ${
                activeSection === item.key ? 'active' : ''
              }`}
              onClick={() => setActiveSection(item.key)}
            >
              <span className="account-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        <section className="account-content">
          {activeSection === 'orders' && (
            <div className="account-card-stack">
              {ORDER_DATA.map((order) => (
                <article key={order.id} className="account-card order-card">
                  <div>
                    <p className="account-meta">Order #{order.id}</p>
                    <h3>{order.items} item{order.items > 1 ? 's' : ''}</h3>
                    <p className="account-sub">Placed on {order.date}</p>
                  </div>
                  <div className="order-side">
                    <p className="order-total">${order.total.toFixed(2)}</p>
                    <span className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                    <button type="button" className="account-link-btn">
                      Track Order
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeSection === 'wishlist' && (
            <div className="account-wishlist-grid">
              {wishlistProducts.length > 0 ? (
                wishlistProducts.map((product) => (
                  <article key={product.id} className="account-card mini-product-card">
                    <img src={product.image} alt={product.name} />
                    <div>
                      <p className="account-meta">{product.category}</p>
                      <h3>{product.name}</h3>
                      <p className="order-total">${product.price.toFixed(2)}</p>
                      <div className="mini-product-actions">
                        <button
                          type="button"
                          className="account-link-btn"
                          onClick={() => onNavigate('product', product.id)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="account-link-btn"
                          onClick={() => addToCart(product, 1)}
                        >
                          Add to Cart
                        </button>
                        <button
                          type="button"
                          className="account-danger-btn"
                          onClick={() => removeFromWishlist(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <article className="account-card account-empty-card">
                  <h3>No items saved yet</h3>
                  <p>Add products to your wishlist to see them here.</p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => onNavigate('products', null)}
                  >
                    Browse Products
                  </button>
                </article>
              )}
            </div>
          )}

          {activeSection === 'addresses' && (
            <div className="account-card-stack two-col">
              {ADDRESS_DATA.map((address) => (
                <article key={address.id} className="account-card address-card">
                  <div className="address-head">
                    <span className="address-tag">{address.tag}</span>
                    {address.isDefault && (
                      <span className="address-default">Default</span>
                    )}
                  </div>
                  <h3>{address.name}</h3>
                  <p className="account-sub">{address.line1}</p>
                  <p className="account-sub">{address.city}</p>
                  <p className="account-sub">{address.phone}</p>
                  <div className="address-actions">
                    <button type="button" className="account-link-btn">Edit</button>
                    <button type="button" className="account-link-btn">Delete</button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeSection === 'profile' && (
            <article className="account-card profile-card">
              <h3>Profile Settings</h3>
              <p className="account-sub">
                Keep your personal details up to date for faster checkout.
              </p>
              <div className="profile-grid">
                <label>
                  Full Name
                  <input type="text" defaultValue="Alex Morgan" />
                </label>
                <label>
                  Email
                  <input type="email" defaultValue="alex@example.com" />
                </label>
                <label>
                  Phone
                  <input type="tel" defaultValue="+1 323 555 0102" />
                </label>
                <label>
                  City
                  <input type="text" defaultValue="Los Angeles" />
                </label>
              </div>
              <button type="button" className="btn-primary profile-save-btn">
                Save Changes
              </button>
            </article>
          )}
        </section>
      </div>
    </main>
  );
}

export default AccountDashboard;

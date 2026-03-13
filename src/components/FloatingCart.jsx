import { useCart } from '../context/CartContext';

function FloatingCart({ isOpen, onClose, onNavigate }) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const shipping = cartTotal >= 50 || cartItems.length === 0 ? 0 : 4.99;
  const total = cartTotal + shipping;

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <div className="cart-drawer-header">
          <h3>Your Cart</h3>
          <button type="button" className="cart-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-drawer-empty">
            <p>Your cart is empty</p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                onClose();
                onNavigate('products', null);
              }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-drawer-items">
              {cartItems.map((item) => (
                <article key={item.id} className="cart-drawer-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-drawer-item-img"
                  />
                  <div className="cart-drawer-item-info">
                    <p className="cart-drawer-item-name">{item.name}</p>
                    <p className="cart-drawer-item-price">${item.price.toFixed(2)}</p>
                    <div className="cart-drawer-item-controls">
                      <div className="quantity-selector compact">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <div className="cart-drawer-row">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="cart-drawer-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="cart-drawer-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                type="button"
                className="checkout-btn"
                onClick={() => {
                  onClose();
                  onNavigate('cart');
                }}
              >
                View Full Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default FloatingCart;

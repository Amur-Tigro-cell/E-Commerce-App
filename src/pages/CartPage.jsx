import { useCart } from '../context/CartContext';

function CartPage({ onNavigate }) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <main className="page-main">
        <h1 className="page-title">Your Cart</h1>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven&apos;t added anything yet.</p>
          <button
            className="btn-primary"
            onClick={() => onNavigate('products', null)}
          >
            Start Shopping
          </button>
        </div>
      </main>
    );
  }

  const shipping = cartTotal >= 50 ? 0 : 4.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  return (
    <main className="page-main">
      <h1 className="page-title">
        Your Cart ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
      </h1>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items-col">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-img"
              />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <span className="cart-item-cat">{item.category}</span>
                <p className="cart-item-unit">${item.price.toFixed(2)} each</p>
              </div>
              <div className="cart-item-controls">
                <div className="quantity-selector">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
                <p className="cart-item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕ Remove
                </button>
              </div>
            </div>
          ))}

          <button className="clear-cart-btn" onClick={clearCart}>
            🗑 Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="free-label">Free 🎉</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {shipping > 0 && (
            <p className="shipping-notice">
              Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
            </p>
          )}

          <button className="checkout-btn">Proceed to Checkout</button>
          <button
            className="continue-btn"
            onClick={() => onNavigate('products', null)}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </main>
  );
}

export default CartPage;

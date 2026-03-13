import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./AmazonNavbar.css";

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home",
  "Books",
  "Toys",
];

export default function AmazonNavbar() {
  const { cartItems } = useContext(CartContext);
  const [dropdown, setDropdown] = useState({ account: false, orders: false });
  const [category, setCategory] = useState(categories[0]);
  const [search, setSearch] = useState("");

  // Responsive dropdown toggle
  const handleDropdown = (type) => {
    setDropdown((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // Sticky effect handled by CSS

  return (
    <nav className="amazon-navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Logo" className="logo" />
        <div className="delivery">
          <span className="delivery-label">Deliver to</span>
          <span className="delivery-location">New York</span>
        </div>
      </div>
      <div className="navbar-center">
        <select
          className="category-dropdown"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-btn">
          <span className="search-icon">🔍</span>
        </button>
      </div>
      <div className="navbar-right">
        <div
          className="account-dropdown"
          onClick={() => handleDropdown("account")}
        >
          <span>Account & Lists</span>
          <div
            className="dropdown-content"
            style={{ display: dropdown.account ? "block" : "none" }}
          >
            <a href="/login">Sign In</a>
            <a href="/register">Register</a>
            <a href="/account">Your Account</a>
          </div>
        </div>
        <div
          className="orders-dropdown"
          onClick={() => handleDropdown("orders")}
        >
          <span>Orders</span>
          <div
            className="dropdown-content"
            style={{ display: dropdown.orders ? "block" : "none" }}
          >
            <a href="/orders">Your Orders</a>
            <a href="/track">Track Order</a>
          </div>
        </div>
        <div className="cart">
          <span className="cart-icon">🛒</span>
          <span className="cart-count">{cartItems.length}</span>
        </div>
      </div>
    </nav>
  );
}

import { useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import RecommendationSection from '../components/RecommendationSection';
import products from '../data/products';
import {
  getRecommendedProducts,
  getRecentlyViewedProducts,
  getTrendingProducts,
  getViewedProductIds,
} from '../utils/recommendations';

const CATEGORIES = [
  { name: 'Electronics', icon: '💻', desc: 'Gadgets & Tech' },
  { name: 'Clothing', icon: '👕', desc: 'Fashion & Style' },
  { name: 'Home & Living', icon: '🏡', desc: 'Decor & Comfort' },
  { name: 'Sports', icon: '🏃', desc: 'Fitness & Exercise' },
];

function Home({ onNavigate, onQuickView }) {
  const featured = products.slice(0, 8);
  const viewedIds = useMemo(() => getViewedProductIds(), []);
  const recentlyViewed = useMemo(
    () => getRecentlyViewedProducts(products, viewedIds, 10),
    [viewedIds]
  );
  const recommendedForYou = useMemo(
    () => getRecommendedProducts(products, viewedIds, 10),
    [viewedIds]
  );
  const trendingProducts = useMemo(() => getTrendingProducts(products, 10), []);

  return (
    <main className="page-main">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">New arrivals every week</p>
          <h1>
            Shop Smarter at <span className="hero-highlight">ShopZone</span>
          </h1>
          <p className="hero-sub">
            Discover amazing products across electronics, fashion, home &amp;
            more — all at unbeatable prices.
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => onNavigate('products', null)}
            >
              Shop All Products
            </button>
            <button
              className="btn-outline"
              onClick={() => onNavigate('products', 'Electronics')}
            >
              Browse Electronics →
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-blob"></div>
          <div className="hero-emoji">🛍️</div>
          <div className="hero-badge-chip">Free Ship over $50</div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">20+</span>
          <span className="stat-label">Products</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">4</span>
          <span className="stat-label">Categories</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">4.6★</span>
          <span className="stat-label">Avg Rating</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">🚚</span>
          <span className="stat-label">Free Shipping $50+</span>
        </div>
      </div>

      {/* Categories */}
      <section className="home-section">
        <div className="section-header">
          <div>
            <h2>Shop by Category</h2>
            <p>Find exactly what you need</p>
          </div>
        </div>
        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => onNavigate('products', cat.name)}
            >
              <span className="cat-icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
              <span className="cat-arrow">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="home-section">
        <div className="section-header">
          <div>
            <h2>Featured Products</h2>
            <p>Our most popular picks</p>
          </div>
          <button
            className="view-all-btn"
            onClick={() => onNavigate('products', null)}
          >
            View All →
          </button>
        </div>
        <div className="products-grid">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      <RecommendationSection
        title="Recommended for you"
        subtitle="Based on products you've explored"
        products={recommendedForYou}
        onNavigate={onNavigate}
        emptyText="Start exploring products and we will personalize recommendations for you."
      />

      <RecommendationSection
        title="Recently viewed products"
        subtitle="Pick up where you left off"
        products={recentlyViewed}
        onNavigate={onNavigate}
        emptyText="You haven't viewed any products yet."
      />

      <RecommendationSection
        title="Trending products"
        subtitle="Popular picks shoppers love right now"
        products={trendingProducts}
        onNavigate={onNavigate}
        emptyText="No trending products available right now."
      />

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <div className="promo-icon">🚀</div>
          <h2>Free Shipping on Orders Over $50</h2>
          <p>
            Plus hassle-free 30-day returns on every order. Shop with
            confidence.
          </p>
          <button
            className="btn-primary"
            onClick={() => onNavigate('products', null)}
          >
            Start Shopping
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;

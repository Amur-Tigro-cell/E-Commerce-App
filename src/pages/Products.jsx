import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const ALL_CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home & Living', 'Sports'];
const RATING_OPTIONS = [0, 3, 4, 4.5];
const SKELETON_COUNT = 8;

function getAvailability(product) {
  // Simulated availability status for demo data.
  return (product.id + product.reviews) % 3 !== 0;
}

function Products({ onNavigate, initialCategory, onQuickView }) {
  const maxPrice = useMemo(
    () => Math.ceil(Math.max(...products.map((product) => product.price))),
    []
  );

  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [maxSelectedPrice, setMaxSelectedPrice] = useState(maxPrice);
  const [minRating, setMinRating] = useState(0);
  const [availability, setAvailability] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const filtered = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    result = result.filter((p) => p.price <= maxSelectedPrice);

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    if (availability === 'in-stock') {
      result = result.filter((p) => getAvailability(p));
    } else if (availability === 'out-of-stock') {
      result = result.filter((p) => !getAvailability(p));
    }

    switch (sortBy) {
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...result].sort((a, b) => b.rating - a.rating);
      case 'reviews':
        return [...result].sort((a, b) => b.reviews - a.reviews);
      default:
        return result;
    }
  }, [
    selectedCategory,
    searchQuery,
    sortBy,
    maxSelectedPrice,
    minRating,
    availability,
  ]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('default');
    setMaxSelectedPrice(maxPrice);
    setMinRating(0);
    setAvailability('all');
  };

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(timeoutId);
  }, [
    selectedCategory,
    searchQuery,
    sortBy,
    maxSelectedPrice,
    minRating,
    availability,
  ]);

  return (
    <main className="page-main">
      <div className="products-page-header">
        <h1>All Products</h1>
        <p>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
      </div>

      <button
        className="mobile-filter-toggle"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {isSidebarOpen ? 'Close Filters ✕' : 'Open Filters ☰'}
      </button>

      <div className="products-layout">
        <aside className={`products-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-head">
            <h3>Filters</h3>
            <button className="clear-filters-btn" onClick={clearAllFilters}>
              Reset
            </button>
          </div>

          <div className="filter-group">
            <p className="filter-title">Category</p>
            <div className="filter-bar">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="price-head">
              <p className="filter-title">Price Range</p>
              <p className="price-value">Up to ${maxSelectedPrice.toFixed(2)}</p>
            </div>
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={maxSelectedPrice}
              onChange={(e) => setMaxSelectedPrice(Number(e.target.value))}
              className="price-slider"
            />
          </div>

          <div className="filter-group">
            <p className="filter-title">Minimum Rating</p>
            <div className="rating-filter-row">
              {RATING_OPTIONS.map((option) => (
                <button
                  key={option}
                  className={`rating-pill ${minRating === option ? 'active' : ''}`}
                  onClick={() => setMinRating(option)}
                >
                  {option === 0 ? 'All' : `${option}★ & up`}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <p className="filter-title">Availability</p>
            <div className="availability-row">
              <button
                className={`availability-pill ${
                  availability === 'all' ? 'active' : ''
                }`}
                onClick={() => setAvailability('all')}
              >
                All
              </button>
              <button
                className={`availability-pill ${
                  availability === 'in-stock' ? 'active' : ''
                }`}
                onClick={() => setAvailability('in-stock')}
              >
                In Stock
              </button>
              <button
                className={`availability-pill ${
                  availability === 'out-of-stock' ? 'active' : ''
                }`}
                onClick={() => setAvailability('out-of-stock')}
              >
                Out of Stock
              </button>
            </div>
          </div>
        </aside>

        <section className="products-content">
          <div className="products-controls">
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />

            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>

          {isLoading ? (
            <div className="products-grid" aria-busy="true" aria-live="polite">
              {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <article key={`skeleton-${index}`} className="skeleton-card">
                  <div className="skeleton-block skeleton-image" />
                  <div className="skeleton-content">
                    <div className="skeleton-block skeleton-line short" />
                    <div className="skeleton-block skeleton-line medium" />
                    <div className="skeleton-block skeleton-line tiny" />
                    <div className="skeleton-bottom-row">
                      <div className="skeleton-block skeleton-price" />
                      <div className="skeleton-block skeleton-chip" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="no-results">
              <span>😕</span>
              <h3>No products found</h3>
              <p>Try adjusting one or more filters.</p>
              <button className="btn-primary" onClick={clearAllFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Products;

import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const ALL_CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home & Living', 'Sports'];

function Products({ onNavigate, initialCategory }) {
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

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
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <main className="page-main">
      <div className="products-page-header">
        <h1>All Products</h1>
        <p>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
      </div>

      <div className="products-controls">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

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

      {filtered.length === 0 ? (
        <div className="no-results">
          <span>😕</span>
          <h3>No products found</h3>
          <p>Try a different search term or category.</p>
          <button
            className="btn-primary"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
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
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;

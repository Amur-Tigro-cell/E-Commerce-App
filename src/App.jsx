import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCart from './components/FloatingCart';
import QuickViewModal from './components/QuickViewModal';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import AccountDashboard from './pages/AccountDashboard';
import { trackViewedProduct } from './utils/recommendations';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const navigate = (page, data = null) => {
    if (page === 'product') {
      setSelectedProductId(data);
      trackViewedProduct(data);
    }
    if (page === 'products') setSelectedCategory(data);
    setCurrentPage(page);
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} onQuickView={setQuickViewProduct} />;
      case 'products':
        return (
          <Products
            key={selectedCategory}
            onNavigate={navigate}
            initialCategory={selectedCategory}
            onQuickView={setQuickViewProduct}
          />
        );
      case 'product':
        return (
          <ProductDetail
            productId={selectedProductId}
            onNavigate={navigate}
            onQuickView={setQuickViewProduct}
          />
        );
      case 'cart':
        return <CartPage onNavigate={navigate} />;
      case 'wishlist':
        return <WishlistPage onNavigate={navigate} />;
      case 'account':
        return <AccountDashboard onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} onQuickView={setQuickViewProduct} />;
    }
  };

  return (
    <WishlistProvider>
      <CartProvider>
        <div className="app-wrapper">
          <Header
            currentPage={currentPage}
            onNavigate={navigate}
            onCartClick={() => setIsCartOpen(true)}
          />
          {renderPage()}
          <Footer onNavigate={navigate} />
          <FloatingCart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onNavigate={navigate}
          />
          <QuickViewModal
            product={quickViewProduct}
            isOpen={Boolean(quickViewProduct)}
            onClose={() => setQuickViewProduct(null)}
          />
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;

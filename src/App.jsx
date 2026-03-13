import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = (page, data = null) => {
    if (page === 'product') setSelectedProductId(data);
    if (page === 'products') setSelectedCategory(data);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'products':
        return (
          <Products
            key={selectedCategory}
            onNavigate={navigate}
            initialCategory={selectedCategory}
          />
        );
      case 'product':
        return (
          <ProductDetail productId={selectedProductId} onNavigate={navigate} />
        );
      case 'cart':
        return <CartPage onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <CartProvider>
      <div className="app-wrapper">
        <Header currentPage={currentPage} onNavigate={navigate} />
        {renderPage()}
        <Footer onNavigate={navigate} />
      </div>
    </CartProvider>
  );
}

export default App;

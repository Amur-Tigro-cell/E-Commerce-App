import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const WishlistContext = createContext();
const WISHLIST_STORAGE_KEY = 'shopzone_wishlist_items';

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const addToWishlist = (productId) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev : [productId, ...prev]
    );
  };

  const removeFromWishlist = (productId) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const toggleWishlist = (productId) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [productId, ...prev]
    );
  };

  const isWishlisted = (productId) => wishlistIds.includes(productId);

  const value = useMemo(
    () => ({
      wishlistIds,
      wishlistCount: wishlistIds.length,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isWishlisted,
    }),
    [wishlistIds]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);

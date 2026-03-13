const VIEWED_PRODUCTS_KEY = 'shopzone_viewed_products';
const MAX_VIEWED_PRODUCTS = 20;

export function getViewedProductIds() {
  try {
    const raw = localStorage.getItem(VIEWED_PRODUCTS_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((id) => Number.isInteger(id));
  } catch {
    return [];
  }
}

export function trackViewedProduct(productId) {
  if (!Number.isInteger(productId)) {
    return;
  }

  const current = getViewedProductIds();
  const updated = [productId, ...current.filter((id) => id !== productId)].slice(
    0,
    MAX_VIEWED_PRODUCTS
  );

  localStorage.setItem(VIEWED_PRODUCTS_KEY, JSON.stringify(updated));
}

export function getRecentlyViewedProducts(products, viewedIds, limit = 10) {
  const productsById = new Map(products.map((product) => [product.id, product]));
  return viewedIds
    .map((id) => productsById.get(id))
    .filter(Boolean)
    .slice(0, limit);
}

export function getTrendingProducts(products, limit = 10) {
  return [...products]
    .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
    .slice(0, limit);
}

export function getRecommendedProducts(products, viewedIds, limit = 10) {
  if (viewedIds.length === 0) {
    return [];
  }

  const viewedSet = new Set(viewedIds);
  const productsById = new Map(products.map((product) => [product.id, product]));
  const categoryScores = new Map();

  viewedIds.forEach((id, index) => {
    const product = productsById.get(id);
    if (!product) {
      return;
    }

    const weight = viewedIds.length - index;
    const previous = categoryScores.get(product.category) ?? 0;
    categoryScores.set(product.category, previous + weight);
  });

  const rankedCategories = [...categoryScores.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);

  const personalized = products
    .filter((product) => !viewedSet.has(product.id))
    .map((product) => ({
      ...product,
      personalizedScore:
        (categoryScores.get(product.category) ?? 0) * 100 +
        product.rating * product.reviews,
    }))
    .sort((a, b) => b.personalizedScore - a.personalizedScore)
    .slice(0, limit);

  if (personalized.length >= limit) {
    return personalized;
  }

  const fallback = products
    .filter((product) => !viewedSet.has(product.id))
    .sort((a, b) => {
      const categoryDelta =
        rankedCategories.indexOf(a.category) - rankedCategories.indexOf(b.category);
      if (categoryDelta !== 0) {
        return categoryDelta;
      }
      return b.rating * b.reviews - a.rating * a.reviews;
    });

  const combined = [...personalized];
  for (const product of fallback) {
    if (combined.find((item) => item.id === product.id)) {
      continue;
    }
    combined.push(product);
    if (combined.length === limit) {
      break;
    }
  }

  return combined;
}
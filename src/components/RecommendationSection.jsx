function RecommendationSection({ title, subtitle, products, onNavigate, emptyText }) {
  return (
    <section className="home-section recommendation-section">
      <div className="section-header">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="recommendation-empty">{emptyText}</div>
      ) : (
        <div className="recommendation-row" role="list">
          {products.map((product) => (
            <article key={product.id} className="recommendation-card" role="listitem">
              <button
                type="button"
                className="recommendation-card-inner"
                onClick={() => onNavigate('product', product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="recommendation-image"
                  loading="lazy"
                />
                <div className="recommendation-content">
                  <p className="recommendation-name">{product.name}</p>
                  <p className="recommendation-category">{product.category}</p>
                  <p className="recommendation-price">${product.price.toFixed(2)}</p>
                </div>
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default RecommendationSection;
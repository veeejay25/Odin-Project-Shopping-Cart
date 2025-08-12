import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import styles from './Shop.module.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  if (loading) {
    return (
      <div className={styles.shop}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.shop}>
        <div className={styles.container}>
          <div className={styles.error}>
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className={styles.retryBtn}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shop}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Our Products</h1>
          <p className={styles.subtitle}>
            Discover our curated collection of quality products
          </p>
        </div>

        <div className={styles.filters}>
          <div className={styles.filterContainer}>
            <label htmlFor="category-filter" className={styles.filterLabel}>
              Filter by category:
            </label>
            <select
              id="category-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.filterSelect}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.productCount}>
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className={styles.productsGrid}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className={styles.noProducts}>
            <h3>No products found</h3>
            <p>Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
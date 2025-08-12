import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to ShopHub</h1>
          <p className={styles.heroSubtitle}>
            Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.
          </p>
          <Link to="/shop" className={styles.ctaButton}>
            Start Shopping
          </Link>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.placeholder}>
            🛍️
          </div>
        </div>
      </section>
      
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose ShopHub?</h2>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🚚</div>
              <h3>Fast Delivery</h3>
              <p>Get your orders delivered quickly and safely to your doorstep.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>💳</div>
              <h3>Secure Payment</h3>
              <p>Shop with confidence using our secure payment system.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⭐</div>
              <h3>Quality Products</h3>
              <p>Carefully curated selection of high-quality products just for you.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔄</div>
              <h3>Easy Returns</h3>
              <p>Not satisfied? Return your purchase within 30 days, no questions asked.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
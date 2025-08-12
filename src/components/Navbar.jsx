import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          ShopHub
        </Link>
        
        <div className={styles.navLinks}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/shop" className={styles.link}>
            Shop
          </Link>
          <Link to="/cart" className={styles.cartButton}>
            <span className={styles.cartIcon}>🛒</span>
            <span className={styles.cartText}>Cart</span>
            {itemCount > 0 && (
              <span className={styles.cartCounter}>{itemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
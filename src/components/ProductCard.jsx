import { useState } from 'react';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const truncateTitle = (title, maxLength = 50) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.title}
          className={styles.productImage}
        />
      </div>
      
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>
          {truncateTitle(product.title)}
        </h3>
        
        <div className={styles.priceSection}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <span className={styles.category}>{product.category}</span>
        </div>
        
        <div className={styles.quantitySection}>
          <label htmlFor={`quantity-${product.id}`} className={styles.quantityLabel}>
            Quantity:
          </label>
          <div className={styles.quantityControls}>
            <button 
              onClick={decrementQuantity}
              className={styles.quantityBtn}
              type="button"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              id={`quantity-${product.id}`}
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className={styles.quantityInput}
            />
            <button 
              onClick={incrementQuantity}
              className={styles.quantityBtn}
              type="button"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className={styles.addToCartBtn}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
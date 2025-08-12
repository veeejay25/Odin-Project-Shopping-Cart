import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  if (cart.length === 0) {
    return (
      <div className={styles.cart}>
        <div className={styles.container}>
          <div className={styles.emptyCart}>
            <div className={styles.emptyCartIcon}>🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some products from our shop to get started!</p>
            <Link to="/shop" className={styles.shopBtn}>
              Go Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Shopping Cart</h1>
          <button 
            onClick={clearCart}
            className={styles.clearBtn}
            aria-label="Clear all items from cart"
          >
            Clear Cart
          </button>
        </div>

        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {cart.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <img src={item.image} alt={item.title} />
                </div>
                
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemCategory}>{item.category}</p>
                  <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
                </div>
                
                <div className={styles.quantityControls}>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className={styles.quantityBtn}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className={styles.quantityBtn}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                
                <div className={styles.itemTotal}>
                  {formatPrice(item.price * item.quantity)}
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className={styles.removeBtn}
                  aria-label="Remove item from cart"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className={styles.cartSummary}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              
              <div className={styles.summaryRow}>
                <span>Items ({cart.reduce((total, item) => total + item.quantity, 0)})</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className={styles.summaryDivider}></div>
              
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              
              <button className={styles.checkoutBtn}>
                Proceed to Checkout
              </button>
              
              <Link to="/shop" className={styles.continueShoppingBtn}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
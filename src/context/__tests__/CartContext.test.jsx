import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  image: 'https://via.placeholder.com/150',
  category: 'test'
};

// Test component that uses the cart context
const CartTestComponent = () => {
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, getCartItemCount, getCartTotal } = useCart();
  
  return (
    <div>
      <div data-testid="cart-count">{getCartItemCount()}</div>
      <div data-testid="cart-total">${getCartTotal().toFixed(2)}</div>
      <button onClick={() => addToCart(mockProduct, 2)}>Add Product</button>
      <button onClick={() => updateQuantity(1, 3)}>Update Quantity</button>
      <button onClick={() => removeFromCart(1)}>Remove Product</button>
      <button onClick={clearCart}>Clear Cart</button>
      <div data-testid="cart-items">
        {cart.map(item => (
          <div key={item.id} data-testid={`item-${item.id}`}>
            {item.title} - Qty: {item.quantity}
          </div>
        ))}
      </div>
    </div>
  );
};

const CartTestWithProvider = () => (
  <CartProvider>
    <CartTestComponent />
  </CartProvider>
);

describe('CartContext', () => {
  it('starts with empty cart', () => {
    render(<CartTestWithProvider />);
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00');
  });

  it('adds items to cart correctly', () => {
    render(<CartTestWithProvider />);
    
    fireEvent.click(screen.getByText('Add Product'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$59.98');
    expect(screen.getByTestId('item-1')).toHaveTextContent('Test Product - Qty: 2');
  });

  it('updates item quantities correctly', () => {
    render(<CartTestWithProvider />);
    
    // First add an item
    fireEvent.click(screen.getByText('Add Product'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    
    // Then update its quantity
    fireEvent.click(screen.getByText('Update Quantity'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('3');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$89.97');
    expect(screen.getByTestId('item-1')).toHaveTextContent('Test Product - Qty: 3');
  });

  it('removes items from cart correctly', () => {
    render(<CartTestWithProvider />);
    
    // Add an item first
    fireEvent.click(screen.getByText('Add Product'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    
    // Then remove it
    fireEvent.click(screen.getByText('Remove Product'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00');
  });

  it('clears cart correctly', () => {
    render(<CartTestWithProvider />);
    
    // Add an item first
    fireEvent.click(screen.getByText('Add Product'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    
    // Then clear the cart
    fireEvent.click(screen.getByText('Clear Cart'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$0.00');
  });

  it('adds to existing item quantity when same product is added', () => {
    render(<CartTestWithProvider />);
    
    // Add product twice
    fireEvent.click(screen.getByText('Add Product'));
    fireEvent.click(screen.getByText('Add Product'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('4');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$119.96');
    expect(screen.getByTestId('item-1')).toHaveTextContent('Test Product - Qty: 4');
  });
});
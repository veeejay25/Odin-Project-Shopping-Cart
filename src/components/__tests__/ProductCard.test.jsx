import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { CartProvider } from '../../context/CartContext';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  image: 'https://via.placeholder.com/150',
  category: 'test'
};

const ProductCardWithProvider = ({ product }) => (
  <CartProvider>
    <ProductCard product={product} />
  </CartProvider>
);

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCardWithProvider product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
  });

  it('has quantity controls that work correctly', () => {
    render(<ProductCardWithProvider product={mockProduct} />);
    
    const quantityInput = screen.getByRole('spinbutton');
    const incrementBtn = screen.getByLabelText('Increase quantity');
    const decrementBtn = screen.getByLabelText('Decrease quantity');
    
    expect(quantityInput.value).toBe('1');
    
    fireEvent.click(incrementBtn);
    expect(quantityInput.value).toBe('2');
    
    fireEvent.click(decrementBtn);
    expect(quantityInput.value).toBe('1');
    
    fireEvent.click(decrementBtn);
    expect(quantityInput.value).toBe('1'); // Should not go below 1
  });

  it('allows manual quantity input', () => {
    render(<ProductCardWithProvider product={mockProduct} />);
    
    const quantityInput = screen.getByRole('spinbutton');
    
    fireEvent.change(quantityInput, { target: { value: '5' } });
    expect(quantityInput.value).toBe('5');
  });

  it('has an "Add to Cart" button', () => {
    render(<ProductCardWithProvider product={mockProduct} />);
    
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('truncates long product titles', () => {
    const longTitleProduct = {
      ...mockProduct,
      title: 'This is a very long product title that should be truncated because it exceeds the maximum length'
    };
    
    render(<ProductCardWithProvider product={longTitleProduct} />);
    
    const titleElement = screen.getByRole('heading', { level: 3 });
    expect(titleElement.textContent).toMatch(/\.\.\.$/); // Should end with ellipsis
  });
});
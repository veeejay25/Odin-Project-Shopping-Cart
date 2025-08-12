import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { CartProvider } from '../../context/CartContext';

const NavbarWithProviders = () => (
  <MemoryRouter>
    <CartProvider>
      <Navbar />
    </CartProvider>
  </MemoryRouter>
);

describe('Navbar', () => {
  it('renders navigation links correctly', () => {
    render(<NavbarWithProviders />);
    
    expect(screen.getByRole('link', { name: 'ShopHub' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shop' })).toBeInTheDocument();
  });

  it('renders cart button with correct text', () => {
    render(<NavbarWithProviders />);
    
    const cartLink = screen.getByRole('link', { name: /cart/i });
    expect(cartLink).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('displays cart icon', () => {
    render(<NavbarWithProviders />);
    
    expect(screen.getByText('🛒')).toBeInTheDocument();
  });

  it('has correct navigation structure', () => {
    render(<NavbarWithProviders />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    // Check for logo
    expect(screen.getByRole('link', { name: /shophub/i })).toBeInTheDocument();
    
    // Check for all navigation links
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4); // Logo, Home, Shop, Cart
  });
});
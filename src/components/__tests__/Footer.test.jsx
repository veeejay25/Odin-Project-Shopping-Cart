import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders GitHub profile link correctly', () => {
    render(<Footer />);
    
    const githubLink = screen.getByRole('link', { name: '@marivicmaclang' });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/marivicmaclang');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders project repository link', () => {
    render(<Footer />);
    
    const projectLink = screen.getByRole('link', { name: 'View on GitHub' });
    expect(projectLink).toBeInTheDocument();
    expect(projectLink).toHaveAttribute('href', 'https://github.com/marivicmaclang/Odin-Project-Shopping-Cart');
    expect(projectLink).toHaveAttribute('target', '_blank');
  });

  it('displays copyright information', () => {
    render(<Footer />);
    
    expect(screen.getByText('© 2024 ShopHub. Part of The Odin Project')).toBeInTheDocument();
  });

  it('contains footer semantic element', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('displays built with love message', () => {
    render(<Footer />);
    
    expect(screen.getByText(/built with ❤️ by/i)).toBeInTheDocument();
  });
});
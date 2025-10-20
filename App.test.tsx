
import { render, screen } from '@testing-library/react';
import App from '../App';
import { useAuth } from './src/contexts/AuthContext';

// Mock the useAuth hook
vi.mock('./contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Mock the components
vi.mock('./pages/Dashboard', () => ({
  default: () => <div>Dashboard</div>,
}));

vi.mock('./pages/Login', () => ({
  default: () => <div>Login</div>,
}));

describe('App', () => {
  it('renders Dashboard when user is authenticated', () => {
    // Arrange
    (useAuth as jest.Mock).mockReturnValue({ user: { role: 'admin' } });

    // Act
    render(<App />);

    // Assert
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('renders Login when user is not authenticated', () => {
    // Arrange
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    // Act
    render(<App />);

    // Assert
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('test login required', () => {
  render(<App />);
  const linkElement = screen.getByText(/Login is required/i);
  expect(linkElement).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import App from './App';
 

test('renders learn react link', async() => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to my App/i);
  expect(linkElement).toBeInTheDocument();
});

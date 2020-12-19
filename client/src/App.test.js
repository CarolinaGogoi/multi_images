import { render, screen } from '@testing-library/react';
import App from './App';

it('renders correctly', async () => {
  renderer.create(<App />);
});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Welcome to my App/i);
//   expect(linkElement).toBeInTheDocument();
// });

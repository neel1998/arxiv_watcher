import { render, screen } from '@testing-library/react';
import ArxivWatcher from './ArxivWatcher';

test('renders learn react link', () => {
  render(<ArxivWatcher />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

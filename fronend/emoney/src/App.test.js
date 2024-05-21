import { render, screen } from '@testing-library/react';
import App from './App';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
   path:"/",
   element:<Home/>
  }

]);

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

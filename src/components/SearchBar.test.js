import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders search input and button', () => {
  const { getByPlaceholderText, getByText } = render(<SearchBar />);
  expect(getByPlaceholderText(/search a song\/artist/i)).toBeInTheDocument();
  expect(getByText(/search/i)).toBeInTheDocument();
});

test('updates input value on change', () => {
  const { getByPlaceholderText } = render(<SearchBar />);
  const input = getByPlaceholderText(/search a song\/artist/i);
  
  fireEvent.change(input, { target: { value: 'test song' } });
  expect(input.value).toBe('test song');
});
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Playlist from './Playlist';

test('renders playlist input and tracks', () => {
  const playlist = [
    { songName: 'Test Song', artist: 'Test Artist', album: 'Test Album', uri: 'spotify:track:123' },
  ];
  
  const { getByPlaceholderText, getByText } = render(<Playlist playlist={playlist} />);
  expect(getByPlaceholderText(/enter a playlist name/i)).toBeInTheDocument();
  expect(getByText('Test Song')).toBeInTheDocument();
});

test('updates playlist name on enter key press', () => {
  const setPlaylistName = jest.fn();
  const { getByPlaceholderText, getByText } = render(<Playlist playlist={[]} setPlaylistName={setPlaylistName} />);
  const input = getByPlaceholderText(/enter a playlist name/i);
  
  fireEvent.change(input, { target: { value: 'My Playlist' } });
  fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
  
  expect(getByText('My Playlist')).toBeInTheDocument();
  expect(setPlaylistName).toHaveBeenCalledWith('My Playlist');
});

test('calls removeSong when remove button is clicked', () => {
  const playlist = [
    { songName: 'Test Song', artist: 'Test Artist', album: 'Test Album', uri: 'spotify:track:123' },
  ];
  const removeSong = jest.fn();

  const { getByText } = render(<Playlist playlist={playlist} removeSong={removeSong} />);
  fireEvent.click(getByText('-'));
  expect(removeSong).toHaveBeenCalled();
});
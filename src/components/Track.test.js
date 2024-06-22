import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Track from './Track';

test('renders track information', () => {
  const track = {
    songName: 'Test Song',
    artist: 'Test Artist',
    album: 'Test Album',
    uri: 'spotify:track:123',
  };
  
  const { getByText } = render(<Track track={track} tracklist={true} />);
  expect(getByText('Test Song')).toBeInTheDocument();
  expect(getByText('Test Artist')).toBeInTheDocument();
  expect(getByText('Test Album')).toBeInTheDocument();
});

test('calls addSong when add button is clicked', () => {
  const track = {
    songName: 'Test Song',
    artist: 'Test Artist',
    album: 'Test Album',
    uri: 'spotify:track:123',
  };
  const addSong = jest.fn();

  const { getByText } = render(<Track track={track} tracklist={true} addSong={addSong} />);
  fireEvent.click(getByText('+'));
  expect(addSong).toHaveBeenCalled();
});

import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import Tracklist from './components/Tracklist';
import Playlist from './components/Playlist';
import {tracks} from './mockTracks';
import { getAuthUrl, getTokenFromUrl } from './auth';


//TODO: good morning you drunk bitch, look up what other components you need to add on codecademy and create some bare bones versions
//then, look at the example code on codecademy AND look up how to use the spotify API
//then, style everything in CSS modules imported into react and used accordingly
//idk what the fuck im doing but i hope we make something that works moderately well lol

function App() {
  const [tracklist, setTracklist] = useState(tracks);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [token, setToken] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };

  //console.log('test');

  function addSong(index) {
    setPlaylist((playlist) => [searchResults[index], ...playlist]);
  };

  //TODO: make this only remove last element that matches
  function removeSong(index) {
    setPlaylist((playlist) => playlist.filter((_, i) => i !== index));
  };

  const savePlaylist = async () => {
    if (!playlist.length) {
      alert('Please add some songs to your playlist before saving.');
      return;
    }

    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = await userResponse.json();
    const userId = userData.id;

    const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: playlistName,
        description: 'My custom playlist',
        public: false,
      }),
    });

    const createPlaylistData = await createPlaylistResponse.json();
    const playlistId = createPlaylistData.id;

    const uris = playlist.map(track => track.uri);

    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris,
      }),
    });

    setPlaylist([]);
    setPlaylistName('');
    setInput('');

    alert('Playlist saved to your Spotify account!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>This is Chris Loven's Spotify playlist creation app!</h1>
        {!token ? (
          <button onClick={handleLogin}>Login to Spotify</button>
        ) : (
          <>
            <SearchBar token={token} input={input} setInput={setInput} setResults={setSearchResults} />
            <div className="content-container">
              <Tracklist tracklist={searchResults} addSong={addSong} />
              <Playlist savePlaylist={savePlaylist} playlist={playlist} removeSong={removeSong} setPlaylistName={setPlaylistName} />
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

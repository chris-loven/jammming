import React, { useState } from 'react';

function SearchBar({input, setInput, token, setResults }) {

    function handleInput(e) {
        setInput(e.target.value);
    }

    const searchTracks = async () => {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${input}&type=track`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data.tracks.items);
        setResults(data.tracks.items);
    };
    
    return (
        <>
          <div>
            <input value={input} onChange={handleInput} type='text' placeholder='Search a song/artist' />
            <button onClick={searchTracks}>Search</button>
          </div>
        </>
    );
}

export default SearchBar;
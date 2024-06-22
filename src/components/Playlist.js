import React, { useState, useEffect } from 'react';
import Track from './Track';

function Playlist(props) {
    const [localPlaylistName, setLocalPlaylistName] = useState('');
    const [isNameSet, setIsNameSet] = useState(false);
    const [uriArr, setUriArr] = useState([]);

    useEffect(() => {
        setUriArr(props.playlist.map((track) => track.uri));
    }, [props.playlist]);

    function handleInput(e) {
        setLocalPlaylistName(e.target.value);
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter' && localPlaylistName.trim() !== '') {
            setIsNameSet(true);
            props.setPlaylistName(localPlaylistName); // Pass the name to App
        }
    }

    function handleRename() {
        setIsNameSet(false);
    }

    return (
        <div className="playlist-container">
            <h2>Playlist: 
                {isNameSet ? (
                    <>
                        <span className="playlist-name">{localPlaylistName}</span>
                        <button onClick={handleRename}>Rename</button>
                    </>
                ) : (
                    <input 
                        className="playlist-input" 
                        value={localPlaylistName} 
                        onChange={handleInput} 
                        onKeyUp={handleKeyPress} 
                        type='text' 
                        placeholder='Enter a playlist name' 
                    />
                )}
            </h2>
            <ul id='playlist'>
                {props.playlist.map((track, i) => 
                    <li key={i}>
                        <Track 
                            tracklist={false} 
                            track={track} 
                            index={i} 
                            removeSong={props.removeSong}
                        />
                    </li> )
                }   
            </ul>
            <button onClick={props.savePlaylist}>Save to Spotify</button>
        </div>
    );
}

export default Playlist;
import React, { useState } from 'react';

function Track(props) {
    const handleRemoveClick = () => {
        console.log('remove');
        props.removeSong(props.index);
    };

    const handleAddClick = () => {
        console.log('add');
        props.addSong(props.index);
    };

    console.log('songName:');
    console.log(props.track.name);
    console.log('Artist:');
    console.log(props.track.artists);
    console.log('Album:');
    console.log(props.track.album.name);



 /*   return (
        <ul id={`track_${props.index}`}>
            <li id={`track_${props.index}_1`}>{props.track.name}</li>
            <li id={`track_${props.index}_2`}>{props.track.artists[0].name}</li>
            <li id={`track_${props.index}_3`}>{props.track.album.name}</li>
            {(props.tracklist ? 
                <button onClick={handleAddClick} id={`addSong_${props.index}`}>+</button> :
                <button onClick={handleRemoveClick} id={`removeSong_${props.index}`}>-</button>)}
        </ul>
    );*/

    return (
        <div className="track-info">
          <span>{props.track.name}</span>
          <span>{props.track.artists[0].name}</span>
          <span>{props.track.album.name}</span>
          {props.tracklist ? 
            <button onClick={handleAddClick} id={`addSong_${props.index}`}>+</button> :
            <button onClick={handleRemoveClick} id={`removeSong_${props.index}`}>-</button>}
        </div>
    );
}

export default Track;
import React, { useState } from 'react';
import Track from './Track';

function Tracklist(props) {
    return (
        <div className="tracklist-container">
            <h2>Results</h2>
            <ul id='tracklist'>
                {props.tracklist.map((track, i) => 
                    <li key={i}>
                        <Track 
                            tracklist={true}
                            track={track} 
                            index={i} 
                            addSong={props.addSong}
                        />
                    </li>
                )}   
            </ul>
        </div>
    );
}

export default Tracklist;
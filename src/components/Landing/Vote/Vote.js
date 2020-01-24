import React, { useState, useEffect } from 'react';
import './Vote.css';

function Vote(props) {
    console.log('VOTE props', props);

    var tonchat = props.kitties[Math.floor(Math.random() * 100)]

    console.log('ton chat', tonchat);
    

    // const [kitt, setKitty] = useState({})

    // useEffect(() => {
    //     setKitty(props.kitties[Math.floor(Math.random() * 100)])
    // }, [])

    // console.log('VOTE kitty', kitty);

    const baseUrl = 'http://25.media.tumblr.com/tumblr_m4bgd9OXmw1qioo2oo1_500.jpg'

    
  return (
    <div>
        <h2>Cat</h2>
        <img src={tonchat} />
    </div>
  );
}

export default Vote;

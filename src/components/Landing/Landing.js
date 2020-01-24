import React, { useState, useEffect } from 'react';
import './Landing.css';
import Header from '../Header/Header';
import Vote from './Vote/Vote';
import { Link } from "react-router-dom";

function Landing() {
    const [hasError, setErrors] = useState(false);
    const [kitties, setKitties] = useState([]);
    const [kittyOne, setKittyOne] = useState({});
    const [kittyTwo, setKittyTwo] = useState({});

    useEffect(() => {
        fetchKitties()
    }, []);

    async function fetchKitties() {
        const res = await fetch("http://localhost:3000/assets/cats.json")
        const data = await res.json();
        setKitties(data.images)
        // res
        //   .json()
        //   .then(res => setKitties(res.images))
        //   .catch(err => setErrors(err))

        //   setKittyOne(kitties[Math.floor(Math.random() * 100)])
        //   setKittyTwo(kitties[Math.floor(Math.random() * 100)])
        
    }

    // useEffect(() => {
    //     randmonKitties()
    // }, [kitties]);

    // const randmonKitties = () => {
    //     const randomNum1 = Math.floor(Math.random() * 100)
    //     const randomNum2 = Math.floor(Math.random() * 100)
    //     setKittyOne(kitties[randomNum1])
    //     setKittyTwo(kitties[randomNum2])
    // }

    // const randomKitties = () => {
    //     const randomNum1 = Math.floor(Math.random() * 100)
    //     setKittyOne(kitties[randomNum1])

    //     do {
    //         const randomNum2 = Math.floor(Math.random() * 100)
    //         setKittyTwo(kitties[randomNum2])
    //     } while (kittyOne !== kittyTwo)
    // }

    //   console.log('kittyOne & Two data >>', kittyOne, kittyTwo);
      console.log("kitties", kitties);

  return (
    <div>
        <Header />
        <h1 className="landing__title">Vote for your favorite kitty</h1>
        {hasError ? <span className="landing__error">There has been an error fetching kitty data</span> : null}
        <div className="landing__mash">
            <Vote kitties={kitties} />
            <Vote kitties={kitties} />
        </div>
        <Link to="/results">Results</Link>
    </div>
  );
}

export default Landing;

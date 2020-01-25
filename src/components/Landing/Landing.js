import React from 'react';
import { Link } from "react-router-dom";
import './Landing.css';
import Vote from './Vote/Vote';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default class Landing extends React.Component {

	state = {
        kitties: [],
        kittyOne: {url: null, id: null},
        kittyTwo: {url: null, id: null},
        hasError : false,
        isLoading: false
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch('http://localhost:3000/assets/cats.json')
        .then(response => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error('There has been an error fetching kitty data')
            }
          })
          .then(data => { 
                // TODO : 
                // > s'assurer que kittyOne est toujours différent de kittyTwo
                // > faire en sorte qu'un chat déjà voté ne se représente jamais                
              let kittyOne = data.images[Math.floor(Math.random() * 100)]
              let kittyTwo = data.images[Math.floor(Math.random() * 100)]
              this.setState({ kitties: data.images, kittyOne, kittyTwo, isLoading: false })
            })
          .then(data => this.setState({ kitties: data.images, isLoading: false }))
          .catch(err => this.setState({ hasError : err}))
      }

    render() {
    console.log('LANDING states', this.state);

        return (
        <div className="landing">
            <Header />
            <h1 className="landing__title">Vote for your favorite kitty</h1>
            {/* {this.state.hasError ? <span className="landing__error">There has been an error fetching kitty data</span> : null} */}
            <div className="landing__mash">
                <Vote kitty={this.state.kittyOne} isLoading={this.state.isLoading} />
                <Vote kitty={this.state.kittyTwo} isLoading={this.state.isLoading} />
            </div>
            <button className="landing__btn"><Link to="/results">View the cutest kittes</Link></button>
            <p className="landing__voters">113 990 votes</p>
            <Footer />
        </div>
        );
    }
}

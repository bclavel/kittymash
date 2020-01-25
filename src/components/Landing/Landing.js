import React from 'react';
import { Link } from "react-router-dom";
import './Landing.css';
import Vote from './Vote/Vote';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default class Landing extends React.Component {

	state = {
        kitties: [],
        kittyOne: {url: null, id: null, votes: 0},
        kittyTwo: {url: null, id: null, votes: 0},
        hasError : false,
        isLoading: false,
        totalVotes : 119301
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

          // Creating the vote property to every kitty
          let kitties = [...data.images]
          kitties.map(item => {
            item.votes = 0
          })

          // Randomly picking the 2 kitties to be displayed on the page
          let kittyOne = kitties[Math.floor(Math.random() * 100)]
          let kittyTwo = kitties[Math.floor(Math.random() * 100)]

          this.setState({ kitties, kittyOne, kittyTwo, isLoading: false })
        })
      .catch(err => this.setState({ hasError : err}))
    }

    // Fonction sent as prop to the Vote component to add 1 vote to the selected kitty
    handleKittyVote = (kitty) => {
      // Adding 1 vote to the selected kitty
      let kittiesTmp = [...this.state.kitties]
      kittiesTmp.map(item => {
        if (item.id === kitty) {
          item.votes += 1
        }
      })

      // Incrementing total votes counter
      let totalVotesTmp = this.state.totalVotes
      totalVotesTmp++
      this.setState({ kitties: kittiesTmp, totalVotes : totalVotesTmp})
    }

    render() {
    console.log('LANDING states', this.state);

        return (
        <div className="landing">
            <Header />
            <h1 className="landing__title">Vote for your favorite kitty</h1>
            {/* {this.state.hasError ? <span className="landing__error">There has been an error fetching kitty data</span> : null} */}
            <div className="landing__mash">
                <Vote kitty={this.state.kittyOne} isLoading={this.state.isLoading} addKittyVote={this.handleKittyVote} />
                <Vote kitty={this.state.kittyTwo} isLoading={this.state.isLoading} addKittyVote={this.handleKittyVote} />
            </div>
            <button className="landing__btn"><Link to="/results">View the cutest kittes</Link></button>
            <p className="landing__voters">{this.state.totalVotes} votes</p>
            <Footer />
        </div>
        );
    }
}

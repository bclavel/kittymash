import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from './components/Landing/Landing';
import Results from './components/Results/Results';

export default class App extends React.Component {

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

    fetch('https://kittymash.herokuapp.com/assets/cats.json')
    .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('There has been an error fetching kitty data')
        }
      })
    .then(data => {
        // Creating the vote property to every kitty
        let kitties = [...data.images]
        kitties.map(item => {
          item.votes = 0
          item.views = 0
        })
        
        // Randomly picking 2 kitties to be displayed on the page
        let randomNumOne = Math.floor(Math.random() * 100)
        let randomNumTwo = Math.floor(Math.random() * 100)
    
        do {
          randomNumTwo = Math.floor(Math.random() * 100)
        } while (randomNumOne === randomNumTwo);
    
        let kittyOne = kitties[randomNumOne]
        let kittyTwo = kitties[randomNumTwo]

        // Incremeting the views counter for the selected kitties
        kitties.map(item => {
          if (item.id === kittyOne.id || item.id === kittyTwo.id) {
            item.views += 1
          }
        })

        this.setState({ kitties, isLoading: false, kittyOne, kittyTwo })

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
    
    // Randomly picking 2 new kitties to be displayed on the page
    let randomNumOne = Math.floor(Math.random() * 100)
    let randomNumTwo = Math.floor(Math.random() * 100)

    do {
      randomNumTwo = Math.floor(Math.random() * 100)
    } while (randomNumOne === randomNumTwo);

    let kittyOne = kittiesTmp[randomNumOne]
    let kittyTwo = kittiesTmp[randomNumTwo]
    
    // Incremeting the views counter for the selected kitties
    kittiesTmp.map(item => {
      if (item.id === kittyOne.id || item.id === kittyTwo.id) {
        item.views += 1
      }
    })

    this.setState({ kitties: kittiesTmp, totalVotes : totalVotesTmp, kittyOne, kittyTwo })
  }

  render() {
      return (
        <Router>
            <Switch>
              <Route exact path="/">
                <Landing kitties={this.state.kitties} kittyOne={this.state.kittyOne} kittyTwo={this.state.kittyTwo} hasError={this.state.hasError} isLoading={this.state.isLoading} totalVotes={this.state.totalVotes} addKittyVote={this.handleKittyVote} />
              </Route>
              <Route path="/results">
                <Results kitties={this.state.kitties} />
              </Route>
            </Switch>
        </Router>
      );
  }
}
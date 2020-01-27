import React from 'react';
import { Link } from "react-router-dom";
import './Landing.css';
import Vote from './Vote/Vote';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default class Landing extends React.Component {

    state = {
      ...this.props,
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
          kitties: nextProps.kitties,
          kittyOne: nextProps.kittyOne,
          kittyTwo: nextProps.kittyTwo,
          isLoading: nextProps.isLoading,
          hasError: nextProps.hasError,
          totalVotes:  nextProps.totalVotes
        })
    }

    render() {
        return (
        <div className="landing">
            <Header />
            <h1 className="landing__title">Vote for your favorite kitty</h1>
            {this.state.hasError ? <span className="landing__error">There has been an error fetching kitty data</span> : null}
            <div className="landing__mash">
                <Vote kitty={this.state.kittyOne} isLoading={this.state.isLoading} addKittyVote={this.state.addKittyVote} />
                <Vote kitty={this.state.kittyTwo} isLoading={this.state.isLoading} addKittyVote={this.state.addKittyVote} />
            </div>
            <button className="landing__btn"><Link to="/results">View the cutest kittes</Link></button>
            <p className="landing__voters">{this.state.totalVotes} votes</p>
            <Footer />
        </div>
        );
    }
}

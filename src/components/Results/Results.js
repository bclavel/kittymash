import React from 'react';
import './Results.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Kitty from './Kitty/Kitty'

export default class Results extends React.Component {

    state = {
      ...this.props,
      pagination: 8
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
          kitties: nextProps.kitties,
        })
    }

    // Fonction to sort kitties by number of votes
    sortKitties = (a, b) => {
      if ( a.votes > b.votes ){
        return -1;
      }
      if ( a.votes < b.votes ){
        return 1;
      }
      return 0;
    }

    loadMoreKitties = () => {      
      this.setState({pagination: this.state.pagination + 9})
    }

    render() {
        return (
        <div className="results">
            <Header />
            <h1 className="results__title">Kitties rankings</h1>
            <div className="results__grid">
              {this.state.kitties.sort(this.sortKitties).filter((item, i, all) => all.indexOf(item) <= this.state.pagination).map((item, i, all) =>
                <Kitty kitty={item} key={i} order={i+1}/>
                )}
            </div>
            <button className="results__btn" onClick={this.loadMoreKitties}>Load more kitties</button>
            <Footer />
        </div>
        );
    }
}

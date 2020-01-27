import React from 'react';
import './Kitty.css';

export default class Vote extends React.Component {

	state = {
        ...this.props,
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
            kitty: nextProps.kitty,
            order: nextProps.order
		})
    }

    render() {
        // Generates the ratio between votes and views 
        let voteRatio = Math.round((this.state.kitty.votes/this.state.kitty.views)*100) || 0

        return (
        <div className="kitty">
            <img className="kitty__img" src={this.state.kitty.url} alt={this.state.kitty.id}/>
            <p>#{this.state.order} - {this.state.kitty.id} - Votes: total {this.state.kitty.votes} - ratio {voteRatio}%</p>
        </div>
        );
    }
}

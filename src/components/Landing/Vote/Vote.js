import React from 'react';
import './Vote.css';

export default class Vote extends React.Component {

	state = {
        ...this.props,
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
            kitty: nextProps.kitty,
            isLoading: nextProps.isLoading
		})
    }
    
    handleKittyVote = () => {
        console.log('A voté !!');
    }

    render() {
        console.log('VOTE props', this.props);
        console.log('VOTE states', this.state);

        if (this.state.isLoading) {
            return <p>Loading ...</p>;
        }

        return (
        <div className="kitty">
            <img className="kitty__img" src={this.state.kitty.url} alt={this.state.kitty.id}/>
            <button className="kitty__btn" onClick={() => this.handleKittyVote()}>Vote!</button>
        </div>
        );
    }
}

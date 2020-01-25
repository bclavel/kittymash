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
        this.state.addKittyVote(this.state.kitty.id)
    }

    render() {
        console.log('VOTE states', this.state);

        if (this.state.isLoading) {
            return <p>Loading ...</p>;
        }

        return (
        <div className="kitty">
            <img className="kitty__img" src={this.state.kitty.url} alt={this.state.kitty.id}/>
            <div className="kitty__share">
                <span className="kitty__share-text">Share this kitty on</span>
                {/* TODO : Add sharing links to Social Media platforms */}
                <img className="kitty__some" src="/assets/facebook.png" alt="Facebook logo"/>
                <img className="kitty__some" src="/assets/twitter.png" alt="Twitter logo"/>
                <img className="kitty__some" src="/assets/whatsapp.png" alt="Whatsapp logo"/>
            </div>
            <button className="kitty__btn" onClick={() => this.handleKittyVote()}>Vote!</button>
        </div>
        );
    }
}

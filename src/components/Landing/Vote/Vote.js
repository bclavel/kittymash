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
        if (this.state.isLoading) {
            return <p>Loading ...</p>;
        }

        return (
        <div className="vote">
            <img className="vote__img" src={this.state.kitty.url} alt={this.state.kitty.id}/>
            <div className="vote__share">
                <span className="vote__share-text">Share this kitty on</span>
                {/* TODO : Add sharing links to Social Media platforms */}
                <img className="vote__some" src="/assets/facebook.png" alt="Facebook logo"/>
                <img className="vote__some" src="/assets/twitter.png" alt="Twitter logo"/>
                <img className="vote__some" src="/assets/whatsapp.png" alt="Whatsapp logo"/>
            </div>
            <button className="vote__btn" onClick={() => this.handleKittyVote()}>Vote!</button>
        </div>
        );
    }
}

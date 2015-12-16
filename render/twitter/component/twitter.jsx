import { Provider } from '../../flux';
import React,{ Component } from 'react';
import Twit from './twit';
import tweetStore from '../store/tweetStore';
import twActions from '../actions';

class Tweet {
	constructor(text = "", rep = null) {
		this.text = text;
		this.repId = rep;
	}
	
	setRep(rep) {
		this.repId = rep;
		return this
	}
	setText(text) {
		this.text = text;
		return this
	}
}

class Twitter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tweet: new Tweet()
		}
	}
	
	render() {
		const tweets = this.props.tweet.reverse().map((tweet, i) => <Twit key={i}>{tweet}</Twit>)
		return (
			<ul className="list-group">
				<li className="list-group-header">
					<input className="form-control" type="text" 
						placeholder="Post tweet" value={this.state.tweet.text}
						onChange={this.changeHandle.bind(this)}
						onKeyDown={this.enterHandle.bind(this)}/>
				</li>
				{ tweets }
			</ul>)
	}
	changeHandle(ev) {
		const {tweet} = this.state;
		this.setState({tweet: tweet.setText(ev.target.value)});
	}
	enterHandle(ev) {
		if(ev.keyCode === 13) {
			twActions.postTweet(this.state.tweet);	
		}
	}
}

export default class TwitterProvider extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return(
		<Provider store={{tweet: tweetStore}}>
			{ Twitter }
		</Provider>
		)
	}
}
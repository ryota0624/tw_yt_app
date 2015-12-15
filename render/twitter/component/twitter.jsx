import { Provider } from '../../flux';
import React,{ Component } from 'react';
import Twit from './twit';
import tweetStore from '../store/tweetStore';

class Twitter extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const tweets = this.props.tweet.reverse().map((tweet, i) => <Twit key={i}>{tweet}</Twit>)
		return (
			<ul className="list-group">
				{ tweets }
			</ul>)
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
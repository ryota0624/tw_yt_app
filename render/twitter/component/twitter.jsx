import { Provider } from '../../flux';
import React,{ Component } from 'react';
import tweetStore from '../store/tweetStore';
import twActions from '../actions';
import TweetList from './tweetList';

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
		return (
			<ul className="list-group">
				<li className="list-group-header">
					<input className="form-control" type="text" 
						placeholder="Post tweet" value={this.state.tweet.text}
						onChange={this.changeHandle.bind(this)}
						onKeyDown={this.enterHandle.bind(this)}/>
				</li>
				<TweetList tweet={this.props.tweet}/>
			</ul>)
	}
	changeHandle(ev) {
		const {tweet} = this.state;
		this.setState({tweet: tweet.setText(ev.target.value)});
	}
	itemClickHandle(ev) {
		
	}
	enterHandle(ev) {
		if(ev.keyCode === 13) {
			if(this.state.tweet.text.length > 0) {
				twActions.postTweet(this.state.tweet);
				this.setState({tweet: new Tweet()})
			}
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
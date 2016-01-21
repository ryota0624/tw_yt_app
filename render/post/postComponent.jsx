import React,{ Component } from 'react';
const _ = require("lodash");
const post = remote.require("./lib/tweet").post;
const tweetText = (text) => {
    const url = /(https:\/\/[\x21-\x7e]+)/gi;
    const urlArr = url.exec(text);
    const linkArr = urlArr ? urlArr.map((url) => <a href={url} />) : [];
    const convText = text.replace(url, "");
    const textArr = _.chunk(convText.split(""), 24);
    return textArr.map(line => <p>{line}</p>).concat(urlArr);
    };
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

export default class PostComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tweet: new Tweet("@"+this.props.tweet.user.screen_name+" ", this.props.tweet.id_str)
		}
	}
	
	render() {
		const {text, user, id_str} = this.props.tweet;
		return (
			<div className='pane-group'>
			 <div className='pane'>
                <img className="img-circle media-object pull-left" src={user.profile_image_url} width="60" height="60"/>
					<strong>{user.name}</strong>
				    <p>@{user.screen_name}</p>
                {tweetText(text)}
				<form>
					<div className="form-group">
    				    <textarea className="form-control" rows="5" value={this.state.tweet.text}
						onChange={this.changeHandle.bind(this)}></textarea>
  				    </div>
						<button className="btn btn-primary" 
						onClick={this.clickHandle.bind(this)}>Primary</button>
				</form>
			   </div>
			</div>
		)
	}
	changeHandle(ev) {
		const {tweet} = this.state;
		this.setState({tweet: tweet.setText(ev.target.value)});
	}
	
	clickHandle() {
		post(this.state.tweet);
		ipc.send('close-tweet', this.props.num);
	}
}
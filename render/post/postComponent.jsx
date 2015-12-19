import React,{ Component } from 'react';
const post = remote.require("./lib/tweet").post;

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
		console.log(this.props)
		const {text, user, id_str} = this.props.tweet;
		return (
			<div className='pane-group'>
				<div className='pane'>
					<span>{user.name}</span>
					<span>{user.screen_name}</span>
			    <img className="img-circle media-object pull-left" src={user.profile_image_url} width="32" height="32"/>
					{text}
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
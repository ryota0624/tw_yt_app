import React,{ Component } from 'react';
import TwModal from './tweetModal';
export default class Twit extends Component {
	constructor(props) {
		super(props);
		this.state = {isModalActive: false};
	}
	render() {
		const { text,user } = this.props.children;
		return (
		<li className="list-group-item"  onClick={this.clickHandle.bind(this)}>
    		<img className="img-circle media-object pull-left" 
				src={user.profile_image_url}
				width="32" height="32"/>
    		<div className="media-body">
					<strong>{user.name}</strong>
      		<p>{text}</p>
    		</div>
  	</li>
		)
	}
	clickHandle() {
		ipc.send('open-tweet', JSON.stringify(this.props.children));
	}
}
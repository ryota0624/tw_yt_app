import React,{ Component } from 'react';

export default class Twit extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { text,user } = this.props.children;
		return (
		<li className="list-group-item">
    		<img className="img-circle media-object pull-left" src={user.profile_image_url} width="32" height="32"/>
    		<div className="media-body">
					<strong>{user.name}</strong>
      		<p>{text}</p>
    		</div>
  	</li>
		)
	}
}
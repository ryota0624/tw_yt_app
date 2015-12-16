import React,{ Component } from 'react';

export default class YTitem extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const video = this.props.children.snippet;
		const id = this.props.children.id.videoId;
		return (
		<li className="list-group-item" value={id} onClick={this.clickHandle.bind(this)}>
			<img src={video.thumbnails.default.url} width="32" height="32"/>
			<p>{ video.title }</p>
  	</li>
		)
	}
	
	clickHandle(ev) {
		window.YTPlayer.loadVideoById(this.props.children.id.videoId);
	}
}
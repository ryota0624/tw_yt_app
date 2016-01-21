import React,{ Component } from 'react';
import TwModal from './tweetModal';
const _ = require("lodash");
const tweetText = (text) => {
    const url = /(https:\/\/[\x21-\x7e]+)/gi;
    const urlArr = url.exec(text);
    const linkArr = urlArr ? urlArr.map((url) => <a href={url} />) : [];
    const convText = text.replace(url, "");
    const textArr = _.chunk(convText.split(""), 24);
    return textArr.map(line => <p>{line}</p>).concat(urlArr);
    };

export default class Twit extends Component {
	constructor(props) {
		super(props);
		this.state = {isModalActive: false};
	}
    
    shouldComponentUpdate(nextProps, nextState) {
        return false
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
      		{ tweetText(text) }
    		</div>
  	</li>
		)
	}
	clickHandle() {
		ipc.send('open-tweet', JSON.stringify(this.props.children));
	}
}

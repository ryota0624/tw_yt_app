import React,{ Component } from 'react';
import TwModal from './tweetModal';
const _ = require("lodash");
const tweetText = (text) => {
    const url = /(https:\/\/[\x21-\x7e]+)/gi;
    const urlArr = url.exec(text);
    const convText = text.replace(url, "");
    const textArr = _.chunk(convText.split(""), 24);
    return textArr.map(line => <p>{line}</p>)
}
const imgStype = {
	display:"inline-block",
	border:"1px solid #ccc",
	padding:"5px 10px",
	"textAlign":"center",
}

const listStyle = {
    width:"100%",
    margin: "0 auto",
    "whiteSpace": "nowrap",
    "overflowX": "scroll"
}

const mediaToLink = (extended_entities) => {
    if(!extended_entities) return [];
     return extended_entities.media.map(item => <img style={imgStype} width={100} height={100} src={item.media_url} />)
}

export default class Twit extends Component {
	constructor(props) {
		super(props);
		this.state = {isModalActive: false};
	}
    
    shouldComponentUpdate(nextProps, nextState) {
        return false
    }
    
	render() {
		const { text,user,extended_entities } = this.props.children;
        const mediaLink = mediaToLink(extended_entities);
		return (
		<li className="list-group-item"  onClick={this.clickHandle.bind(this)}>
    		<img className="img-circle media-object pull-left" 
				src={user.profile_image_url}
				width="32" height="32"/>
    		<div className="media-body">
					<strong>{user.name}</strong>
      		{ tweetText(text) }
            <ul style={listStyle}>
            { mediaLink }
            </ul>
    		</div>
  	</li>
		)
	}
	clickHandle() {
		ipc.send('open-tweet', JSON.stringify(this.props.children));
	}
}

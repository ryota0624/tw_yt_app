import React,{ Component } from 'react';
const _ = require("lodash");
const post = remote.require("./lib/tweet").post;
const imgStype = {
	display:"inline-block",
	border:"1px solid #ccc",
	padding:"5px 10px",
	"text-align":"center",
}

const listStyle = {
    width:"100%",
    margin: "0 auto",
    "white-space": "nowrap",
    "overflow-x": "scroll"
}
const tweetText = (text) => {
    const url = /(https:\/\/[\x21-\x7e]+)/gi;
    const urlArr = url.exec(text);
    console.log(urlArr)
    // const linkArr = urlArr ? urlArr.map((url) => <img src={url} />) : [];
    const convText = text.replace(url, "");
    const textArr = _.chunk(convText.split(""), 24);
    return textArr.map(line => <p>{line}</p>)//.concat(linkArr);
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

const mediaToLink = (extended_entities) => {
    if(!extended_entities) return [];
     return extended_entities.media.map(item => <li style={imgStype}><img width={200} height={200} src={item.media_url} /></li>)
}

export default class PostComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tweet: new Tweet("@"+this.props.tweet.user.screen_name+" ", this.props.tweet.id_str)
		}
	}
	
	render() {
		const {text, user, id_str, extended_entities} = this.props.tweet;
        const mediaLink = mediaToLink(extended_entities);
		return (
			<div className='pane-group'>
			 <div className='pane'>
             <ul className="list-group">
                <li className="list-group-header">
                <img className="img-circle media-object pull-left" src={user.profile_image_url} width="40" height="40"/>
                	<strong>{user.name}</strong>
				    <p>@{user.screen_name}</p>
                </li>
                <li className="list-group-item">
                {tweetText(text)}
                </li>
                <li className="list-group-item">
                <ul style={listStyle}>
                    {mediaLink}
                </ul>
                </li>
                <li className="list-group-item">
				
					<div className="form-group">
    				    <textarea className="form-control" rows="5" value={this.state.tweet.text}
						onChange={this.changeHandle.bind(this)}></textarea>
  				    </div>
                 </li>
                 <li className="list-group-item">
                     <div className="btn-group">
						<button className="btn btn-primary" 
						onClick={this.clickHandle.bind(this)}>
                            リプライ
                        </button>
                        <button className="btn btn-primary" 
						onClick={this.clickHandle.bind(this)}>
                            お気に入り
                        </button>
                        { user.screen_name != "58ryt" ? false : <button className="btn btn-primary" 
						onClick={this.clickHandle.bind(this)}>削除</button>}
				    </div>
                   </li>
               </ul>
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
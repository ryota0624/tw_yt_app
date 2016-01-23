import React,{ Component } from 'react';
import YTPlayer from './youtubePlayer';
import YTitem from "./youtubeItem";
import { Provider } from '../../flux';
import ytStore from '../youtubeStore';
import ytAction from '../ytActions';

class Youtube extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ""
		}
	}
	//動画ツイートボタン
	render() {
        console.log("hoge")
		const list = this.props.yt.list.map((item, i) => {
			return <YTitem key={i}>{item}</YTitem>
		})
		return (
			<div>
				<YTPlayer videoId={this.props.yt.videoId}/>
				<ul className="list-group">
					<li className="list-group-header">
    				<input className="form-control" type="text" 
						placeholder="Search for someone" 
						value={this.state.search} 
						onKeyDown={this.enterHandle.bind(this)}
						onChange={this.changeHandle.bind(this)}
						/>
					</li>
                    <li className="list-group-item">
                      <div className="btn-group">
                        <button className="btn btn-large btn-default">
                            <span className="icon icon-note"></span>
                        </button>
                        <button className="btn btn-large btn-default">
                            <span className="icon icon-user"></span>
                        </button>
                       </div>
                    </li>
					{list}
				</ul>
			</div>
		)
	}
	
	enterHandle(ev) {
		if(ev.keyCode === 13) {
			ytAction.searchVideo(this.state.search);	
		}
	}
	changeHandle(ev) {
		this.setState({search: ev.target.value})
	}
}

export default class YoutubeProvider extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Provider store={{yt: ytStore}}>
				{Youtube}
			</Provider>
		)
	}
}
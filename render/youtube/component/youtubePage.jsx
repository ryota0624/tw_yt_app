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
	
	render() {
		const list = this.props.yt.map((item, i) => {
			return <YTitem key={i}>{item}</YTitem>
		})
		return (
			<div>
				<YTPlayer />
				<ul className="list-group">
					<li className="list-group-header">
    				<input className="form-control" type="text" 
						placeholder="Search for someone" 
						value={this.state.search} 
						onKeyDown={this.enterHandle.bind(this)}
						onChange={this.changeHandle.bind(this)}
						/>
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
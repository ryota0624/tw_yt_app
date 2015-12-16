import React,{ Component } from 'react';
export default class YTPlayer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			play: false
		}
	}
	componentDidMount() {
		
	}
	render() {
		return (
			<div style={{textAlign: 'center'}}>
				<div id="youtube"></div>
			</div>
		)
	}
	
	videoPlay() {
		const bool = this.state.play;
		if(bool) {
			window.YTPlayer.pauseVideo();
			this.setState({play: !bool})
		} else {
			window.YTPlayer.playVideo();
			this.setState({play: !bool})
		}
	}
}
import React,{ Component } from 'react';
import YouTube from 'react-youtube';

export default class YTPlayer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			play: false
		}
	}
    
    shouldComponentUpdate(nextProps, nextState) {
       return nextProps.videoId !== this.props.videoId
    }
    
    
	render() {
        const opts = {
            height: '100',
            width: '175',
            playerVars: { // https://developers.google.com/youtube/player_parameters 
                autoplay: 1
            }
        }
		return (
			<div style={{textAlign: 'center'}}>
                {this.props.videoId ? <YouTube
                    videoId={this.props.videoId}
                    opts={opts}
                    onReady={this.onReady.bind(this)}
                /> : false }
			</div>
		)
	}
	
    onReady(ev) {
        console.log(ev);
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
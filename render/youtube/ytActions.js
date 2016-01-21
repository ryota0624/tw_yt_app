import {dispatcher} from '../flux';
import constants from './constants';
import youtube from './youtube';

const searchVideo = (keyword) => {
	console.log(keyword)
	youtube.searchYoutube(keyword).then(videos => {
		dispatcher.dispatch({
			videos: videos.items,
			actionType: constants.add,
		})
	})
}

const up = (videoId) => {
    dispatcher.dispatch({
        actionType: constants.up,
        videoId
    })
}
module.exports = {
	searchVideo,
    up
}

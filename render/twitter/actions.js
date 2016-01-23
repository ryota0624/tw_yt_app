import {dispatcher} from '../flux';
import constants from './constants';
const post = remote.require("./lib/tweet").post;
const favorite = remote.require("./lib/tweet").favorite;

const addTweet = (tweet) => {
	dispatcher.dispatch({
		tweet,
		actionType: constants.add,
	})
}

const initFetch = (tweets) => {
    dispatcher.dispatch({
        tweets,
        actionType: constants.init
    })
}

const postTweet = (tweet) => {
	post(tweet);
}

export default  {
	addTweet,
	postTweet,
    initFetch
}

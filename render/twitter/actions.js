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

const fetchInit = (tweets) => {
    dispatcher.dispatch({
        tweets,
        actionType: constants.init
    })
}

const postTweet = (tweet) => {
	post(tweet);
}
window.add = addTweet;
export default  {
	addTweet,
	postTweet,
    fetchInit
}

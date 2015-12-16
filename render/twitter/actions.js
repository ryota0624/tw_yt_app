import {dispatcher} from '../flux';
import constants from './constants';
const post = remote.require("./lib/tweet").post;
const favorite = remote.require("./lib/tweet").favorite;
console.log(post)
console.log(constants)
const addTweet = (tweet) => {
	console.log(tweet)
	dispatcher.dispatch({
		tweet,
		actionType: constants.add,
	})
}

const postTweet = (tweet) => {
	post(tweet);
}

export default  {
	addTweet,
	postTweet
}

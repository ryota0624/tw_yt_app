import {dispatcher} from '../flux';
import constants from './constants';
console.log(constants)
const addTweet = (tweet) => {
	console.log(tweet)
	dispatcher.dispatch({
		tweet,
		actionType: constants.add,
	})
}

export default  {
	addTweet
}

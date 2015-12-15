import { Store } from "../../flux";
import constants from "../constants.js";

class TweetStore extends Store {
	constructor(initialState) {
		super(initialState);
		this.register(this.handler.bind(this))
	}
	
	handler(action) {
		console.log(action);
		switch(action.actionType) {
			case constants.add :
			 console.log(action)
				this.state = this.state.concat(action.tweet);
				this.emitChange();
				break;
			default:
		}
	}
}

const tweetStore = new TweetStore([]);
 
export default tweetStore;
import { Store } from "../../flux";
import constants from "../constants.js";
import storageCreater from "../../storage";
const  storage = storageCreater('tw',10000);

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
				storage.saveStorage(this.state);
				break;
			default:
		}
	}
}

const tweetStore = new TweetStore(storage.loadStorage());
 
export default tweetStore;
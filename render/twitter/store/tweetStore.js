import { Store } from "../../flux";
import constants from "../constants.js";
import storageCreater from "../../storage";
const  storage = storageCreater('tw',1000);


class TweetStore extends Store {
	constructor(initialState) {
		super(initialState);
		this.register(this.handler.bind(this));
	}
	
	handler(action) {
		switch(action.actionType) {
			case constants.add :
                if(tweetCheck(this.state ,action.tweet)) {
                    this.state = this.state.concat(action.tweet);
				    this.emitChange();
				    storage.saveStorage(this.state);   
                }
				break;
			default:
		}
	}
}

const tweetStore = new TweetStore(storage.loadStorage());
 
export default tweetStore;

function tweetCheck(state, tweet) {
    if(!tweet || !tweet.id) return false
    const length = state.length > 30 ? 30 : state.length ;
    for(let i = 0; i < length; i++) {
        if(state[(state.length-1) - i].id === tweet.id) {
            return false
        }
    }
    return true
}
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
                if(tweetCheck(action.tweet)) {
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
    console.log(state);
    state.forEach(item =>  {
        if(item.id_str === tweet.id_str) {
            console.log(item)
            return false
        }
    })
    return true
}
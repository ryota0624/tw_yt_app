import { Store } from "../../flux";
import constants from "../constants.js";
import storageCreater from "../../storage";
const  storage = storageCreater('tw',1000);
const im = require("immutable");
const twitter = remote.require("./lib/tweet");

class TweetStore extends Store {
	constructor(initialState) {
		super(initialState);
		this.register(this.handler.bind(this));
	}
	
	handler(action) {
		switch(action.actionType) {
			case constants.add :
                const { id } = action.tweet;
                this.state.tweets = this.state.tweets.set(id, action.tweet);
			    this.emitChange();
                this.saveTweets();
			break;
            case constants.init :
                {tweets} = action;
                let tweetsOb = {};
                tweets.forEach(tweet => {
                    tweetsOb[tweet.id] = tweet;
                });
                this.state.tweets = tweets.concat(im.Map(tweetsOb));
			    this.emitChange();
                this.saveTweets();
            break;
			default:
		}
	}
    
    saveTweets() {
        const forStorage = Object.assign({}, this.state, {tweets: this.state.tweets.toJSON()});
		storage.saveStorage(forStorage);
    }
}
let initStorage = storage.loadStorage();
initStorage.tweets = new im.Map(initStorage.tweets);
const tweetStore = new TweetStore(initStorage);
 
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
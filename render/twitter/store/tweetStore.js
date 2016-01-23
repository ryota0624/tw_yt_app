import { Store } from "../../flux";
import constants from "../constants.js";
import storageCreater from "../../storage";
const  storage = storageCreater('tw',1000);
const im = require("immutable");
const twitter = remote.require("./lib/tweet");
import actions from "../actions";

class TweetStore extends Store {
	constructor(initialState) {
		super(initialState);
		this.register(this.handler.bind(this));
        this.initStore();
	}
    
    initStore() {
        twitter.fetch(10, (tweets) => {
            if(tweets.errors) {
                console.log(tweets.errors);
                return false
            }
            actions.fetchInit(tweets);
            twitter.stream().on("tweet", (tweet) => {
                actions.addTweet(tweet);
            });
              
        })
    }
	
	handler(action) {
		switch(action.actionType) {
			case constants.add :
                const { id_str } = action.tweet;
                this.state.tweets = this.state.tweets.set(id_str, action.tweet);
			    this.emitChange();
                this.saveTweets();
			break;
            case constants.init :
                const {tweets} = action;
                let tweetsOb = {};
                tweets.forEach(tweet => {
                    tweetsOb[tweet.id_str] = tweet;
                });
                console.log(im.Map(tweetsOb))
                this.state.tweets = this.state.tweets.concat(im.Map(tweetsOb));
			    this.emitChange();
                this.saveTweets();
            break;
			default:
		}
	}
    
    saveTweets() {
        console.log(this.state)
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
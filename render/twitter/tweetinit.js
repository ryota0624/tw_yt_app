const twitter = remote.require("./lib/tweet");
import actions from './actions';

const twitInit = (n) => {
    console.log("fetch");
    twitter.fetch(n, (tweets) => {
        if(tweets.errors) {
            setTimeout(()=> twitInit(30), 6000)
            return false
        }
        console.log(tweets)
        tweets.reverse().forEach(tweet => {
            actions.addTweet(tweet);
        })
        twitter.stream().on("tweet", (tweet) => {
            actions.addTweet(tweet);
        })
    })
}
module.exports = {
    twitInit
}
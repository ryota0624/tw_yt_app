import React,{ Component } from 'react';
import Twit from './twit';

const compareTweet = (a, b) => {
    const aDate = (new Date(a.created_at)).getTime();
    const bDate = (new Date(b.created_at)).getTime();
    return aDate < bDate
};

export default class TweetList extends Component {
    constructor(props, contexts) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        const bool = (nextProps.tweet !== this.props.tweet || nextProps.page !== this.props.tweet);
        return bool
    }
    
    render() {
        const page = this.props.page * -10;
        const tweets = this.props.tweet.sort(compareTweet)
            .slice(page)
            .map((tweet, i) => <Twit key={tweet.id}>{tweet}</Twit>)
        return <span>
        { tweets }
        </span>
    }
}

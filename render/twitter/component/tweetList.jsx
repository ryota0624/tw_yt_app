import React,{ Component } from 'react';
import Twit from './twit';

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
        const tweets = this.props.tweet
            .slice(page)
            .map((tweet, i) => <Twit key={tweet.id_str}>{tweet}</Twit>)
            .reverse()
        return <span>
        { tweets }
        </span>
    }
}

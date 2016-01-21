import React,{ Component } from 'react';
import Twit from './twit';

export default class TweetList extends Component {
    constructor(props, contexts) {
        super(props);   
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props
    }
    
    render() {
        const tweets = this.props.tweet.map((tweet, i) => <Twit key={i}>{tweet}</Twit>).reverse()
        return <span>
        { tweets }
        </span>
    }
}

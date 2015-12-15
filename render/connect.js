import { dispatcher } from './flux';
import  actions from './twitter/actions';
export default () => {
  ipc.on("tweet", (ev, tweet) => {
  actions.addTweet(JSON.parse(tweet));
})};
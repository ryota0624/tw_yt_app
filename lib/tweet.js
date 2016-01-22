var Twit = require("twit");
var If = require("ifx");
const key = require("./config.js");
const consumer = key.c;
const access = key.a;
var twitter = new Twit({
  consumer_key: consumer.Key,
  consumer_secret: consumer.Secret,
  access_token: access.Token,
  access_token_secret: access.Stoken
});
//const friends　= twitter.get('followers/ids', { screen_name: '58ryt' },  function (err, data, response) {
//  console.log(data.ids)
//})
const myAccount = "@58ryt";

var stream = () => twitter.stream('user');
var publicStream = () => twitter.stream('statuses/sample')

function fetchTL(num, callback) {
  twitter.get("statuses/home_timeline",{count: num}, (i, j) => {
      callback(j);
  })
}

function favorite(id, now) {
  var path = If(now === false)(() => "create").Else(() => "destroy");
  twitter.post(`favorites/${path}`, {
    id: id
  },(err,res,data)=>{
  })
}

function post(tweet) {
  twitter.post("statuses/update", {
    in_reply_to_status_id: tweet.repId,
    status: tweet.text
  }, (err, data, response) => {
    return data
  })
}

module.exports = {
  publicStream,
  stream,
  post,
  favorite,
  fetch: fetchTL,
};

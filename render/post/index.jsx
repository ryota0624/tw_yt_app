import { render } from 'react-dom';
import React from 'react';
import Post from './postComponent';
ipc.on("tweet", (ev, ob) => {
  const tw = JSON.parse(ob.tweet);
	render(<Post tweet={tw} num={ob.windowNum}/>, document.getElementById('app'));
});

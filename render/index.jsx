const React = require('react');
const render = require('react-dom').render;
import connect from './connect';
import Twitter from './twitter/component/twitter';
import Youtube from './youtube/component/youtubePage';
import MarkDown from './markDown/component/mdComponent';

connect();

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="pane-group">
				{/*<div className="pane"><MarkDown /></div>*/}
				<div className="pane"><Twitter /></div>
				<div className="pane"><Youtube /></div>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));
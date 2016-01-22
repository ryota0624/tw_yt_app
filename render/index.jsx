const React = require('react');
const render = require('react-dom').render;
// import connect from './connect';
import Twitter from './twitter/component/twitter';
import Youtube from './youtube/component/youtubePage';
import MarkDown from './markDown/component/mdComponent';
import FileUp from './imgUpdater/component/imgUpdate';
import Sidebar from './sidebar/component/iconsComponent';
import { Provider } from './flux';
import sidebarStore from './sidebar/store';
import { twPage } from './sidebar/actions.js'; 

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
        const { twitter, youtube, twPage } = this.props.tab;
		return (
			<div className="pane-group">
                {/*<div className="pane"><MarkDown /></div>*/}
                <div className="pane-mini sidebar"><Sidebar /></div>
				{twitter ? <div id="twitter" onScroll={this.twPageHandle.bind(this)} className="pane"><Twitter /></div> : false }
				{youtube ? <div id="youtube" className="pane"><Youtube /></div> : false }
				{/*<div className="pane"><FileUp userId={1} target={"http://localhost:3000/img"} post={"http://localhost:3000/api/addessay"}/></div>*/}
			</div>
		)
	}
    
    scrollhandle(e) {
        const height = e.target.offsetHeight;
        const scrollHeight = e.target.scrollHeight;
        const top = e.target.scrollTop;
        const positon = height + top;
        if((scrollHeight - positon) / scrollHeight <= 0){
            return true
        }
    }
    
    twPageHandle(e) {
        this.scrollhandle(e) ? twPage() : false
    }
}

class AppProvider extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Provider store={{tab: sidebarStore}}>
				{ App }
			</Provider>
		)
	}
}


render(<AppProvider />, document.getElementById('app'));


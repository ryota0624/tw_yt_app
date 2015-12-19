import React,{ Component } from 'react';
const marked = require('marked');
import mdStore from '../markDownStore.js';
import { Provider } from '../../flux';
import actions from '../mdActions';

class md extends Component {
	constructor(props) {
		super(props);
		this.state = {
			md: this.props.markDown
		}
	}
	
	componentWillReceiveProps(nextProp) {
		console.log(nextProp)
		if(nextProp.markDown !== this.state.md) {
			this.setState({ md: nextProp.markDown });
		}
	}
		
	rawMarkup() {
		const markup = marked(this.state.md.toString(), {sanitize: true});
		return { __html: markup };
	}
	onChangeHandle(ev) {
		this.setState({md: ev.target.value});
		actions.sendMd(ev.target.value);
	}
	render() {
		return (
		<div>
			<div className="form-group">
    		<textarea className="form-control" rows="3" 
				value={this.state.md} 
				onChange={this.onChangeHandle.bind(this)}>
				</textarea>
  		</div>
			<span dangerouslySetInnerHTML={this.rawMarkup.bind(this)()} />
		</div>
		)
	}
} 

export default class mdProvider extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
	return (
			<Provider store={{markDown: mdStore}}>
				{md}
			</Provider>
		)
	}
}
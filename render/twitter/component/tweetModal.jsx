import React,{ Component } from 'react';
import classNames from 'classnames';

export default class TwModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false,
			willClose: false
		}
	}
	
	componentWillReceiveProps(nextProps) {
    console.log(nextProps)
		if(nextProps.isActive) {
			this.setState({isActive: true, willClose: false});
		} else {
      console.log(this.state)
			const self = this;
			this.setState({willClose: true, isActive: false});
      console.log(this.state)
		}
	}
	
	onClose() {
		this.props.onClose();
	}
	
	render() {
		const modalClasses = classNames({
			'animated': true,
			'slideInDown': this.state.isActive,
			'slideOutUp': this.state.willClose
		});
		if(this.state.isActive) {
			return (
				<div>
          <div
            style={{
              display: "block",
              zIndex: "8887",
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
              background: "gray",
              opacity: "0.7"
            }}
            onClick={this.onClose.bind(this)}
          >
          </div>
          <div
            className={modalClasses}
            style={{
              display: "block",
              zIndex: "8888",
              height: "200px",
              width: "300px",
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
              margin: "auto",
              background: "white"
            }}
          >
            <h1>Modal!!</h1>
            <button className="btn" onClick={this.onClose.bind(this)}>
              Close
            </button>
          </div>
        </div>
			)
		}
    else {
      return false
    }
	}
}
import React,{ Component } from 'react';
const request = require("superagent");
const marked = require('marked');

export default class ImgUpdate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			images: [],
			img: 0,
			md: ""
		}
	}
	
	render() {
		const imgForm = ((num) => {
			let forms =[];
			for(let i = 0;i < num; i++) {
				forms.push(
					<input type="file" name={makeRand()} 
						encType="multipart/form-data"
						key={i}
					/>
				)
			}
			return forms;
		})(this.state.img)
		return (
			<div>
			<input type="text" value={this.state.title} onChange={this.titlehandle.bind(this)}/>
			<form onChange={this.onChange.bind(this)} 
			action={this.props.target} 
			method="post" encType="multipart/form-data"
			target="send">
					<input type="file" name={makeRand()} 
						encType="multipart/form-data"
					/>
			</form>
			<iframe name="send" hidden></iframe>
				<div className="row">
					<div className="col s12 m6 l6">
						<textarea onChange={this.changeText.bind(this)} value={this.state.md} />
					</div>
					<div className="col s12 m6 l6">
						<div className="md-frame">
						<span dangerouslySetInnerHTML={this.rawMarkup.bind(this)()} />
						</div>
					</div>
				</div>
				<button className="btn btn-primary" id="post-btn" onClick={this.onSubmit.bind(this)}>投稿</button>
			</div>
		)
	}
	
	onSubmit() {
		request.post(this.props.post)
		.send({user_id: this.props.userId, title: this.state.title, text: this.state.md})
		.end((err, res) => console.log(res))
	}
	
	onChange(ev) {
		const data = new FormData(ev.target.parentNode)
		request.post(this.props.target)
    .send(data)
    .end((err, res) => console.log(res))
		
		const files = this.props.target+"/"+ev.target.name;
		const tag = `  \n![${files}](${files})  `
		this.setState({md: this.state.md + tag})
	}
	
	changeText(ev) {
		this.setState({md: ev.target.value})
	}
	
	inc() {
		this.setState({img: this.state.img+1})
	}
	
	rawMarkup() {
		const markup = marked(this.state.md.toString(), {sanitize: true});
		return { __html: markup };
	}
	
	titlehandle(ev) {
		this.setState({title: ev.target.value})
	}
}

function makeRand() {
	var l = 8;
	var c = "abcdefghijklmnopqrstuvwxyz0123456789";
	var cl = c.length;
	var r = "";
	for(var i=0; i<l; i++){
		r += c[Math.floor(Math.random()*cl)];
	
	}
	return r
}

//class: "kijiti", placeholder: "title" ,id: "essay-title"
import React,{ Component } from 'react';
import actions from '../actions';

export default class IconsComponent extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
       return <ul className="list-group">
            <li className="list-group-item">
                <a><img name="twitter" 
                className="img-circle media-object pull-left" 
                src="https://lh3.ggpht.com/nn0_2f2yehKR7fnMIZ0XrSWbC5Q0VPP7vNmLMV7ndNFinClynZRO4RBTGfbjVOs1fyA=w300" 
                onClick={this.clickHandle.bind(this)}
                width="35" height="35"/></a>
            </li>
            <li className="list-group-item">
                <a><img name="youtube" 
                className="img-circle media-object pull-left" 
                src="http://www.cigaraficionado.com/css/img/social/youtube.png" 
                onClick={this.clickHandle.bind(this)}
                width="35" height="35"/></a>
            </li>
            <li></li>
        </ul>
    }
    
    clickHandle(ev) {
        console.log(actions)
        actions.toggle(ev.target.name);
    }
}
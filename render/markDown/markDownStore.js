import { Store } from "../flux";
import constants from "./constants.js";

class MdStore extends Store {
	constructor(initialState) {
		super(initialState);
		console.log(this.state)
		this.register(this.handler.bind(this))
	}
	
	handler(action) {
		switch(action.actionType) {
			case constants.add :
				this.state = action.text;
				this.emitChange();
				break;
			default:
		}
	}
}
const markDownStore = new MdStore([]);
 
export default markDownStore;
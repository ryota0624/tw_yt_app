import { Store } from "../flux";
import constants from "./constants.js";

class YTStore extends Store {
	constructor(initialState) {
		super(initialState);
		this.register(this.handler.bind(this))
	}
	
	handler(action) {
		switch(action.actionType) {
			case constants.add :
				this.state = this.state.concat(action.videos);
				console.log(this.state)
				this.emitChange();
				break;
			default:
		}
	}
}

const youtubeStore = new YTStore([]);
 
export default youtubeStore;
import { Store } from "../flux";
import constants from "./constants.js";
import storageCreater from "../storage";
const  storage = storageCreater('yt',100);
console.log(storage.loadStorage())

class YTStore extends Store {
	constructor(initialState) {
		super(initialState);
		this.register(this.handler.bind(this))
	}
	
	handler(action) {
		switch(action.actionType) {
			case constants.add :
				this.state = [].concat(action.videos, this.state);
				this.emitChange();
				storage.saveStorage(this.state);
				break;
			default:
		}
	}
}
const initialState = storage.loadStorage()
const youtubeStore = new YTStore(initialState);
 
export default youtubeStore;
import { Store } from "../flux";
import constants from "./constants.js";
import storageCreater from "../storage";
const  storage = storageCreater('yt',100);

class YTStore extends Store {
	constructor(initialState) {
		super(initialState);
		this.register(this.handler.bind(this))
	}
	
	handler(action) {
		switch(action.actionType) {
			case constants.add :
				let nextState = [].concat(action.videos, this.state.list);
                this.state.list = nextState;
				this.emitChange();
				storage.saveStorage(this.state);
				break;
            case constants.up :
                this.state.videoId = action.videoId;
                this.emitChange();
                storage.saveStorage(this.state);
                break;
			default:
		}
	}
}
let initialState = storage.loadStorage();
initialState.list = initialState.list ? initialState.list : [];

const youtubeStore = new YTStore(initialState);
 
export default youtubeStore;
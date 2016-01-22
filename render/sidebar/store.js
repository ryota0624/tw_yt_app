import { Store } from "../flux";
import constants from "./constants.js";
import storageCreater from "../storage";
const  storage = storageCreater('sidebar',10000);

class SidebarStore extends Store {
	constructor(initialState) {
		super(initialState);
		this.register(this.handler.bind(this))
	}
	
	handler(action) {
		console.log(action);
		switch(action.actionType) {
			case constants.toggle :
				this.state[action.tab] = !this.state[action.tab];
				this.emitChange();
				storage.saveStorage(this.state);
				break
            case constants.twPage :
                this.state.twPage = this.state.twPage + 1;
                this.emitChange();
                storage.saveStorage(this.state);
                break
			default:
		}
	}
}
const initial = {twitter: true, youtube: true, twPage: 2}
const sidebarStore = new SidebarStore(initial);
 
export default sidebarStore;
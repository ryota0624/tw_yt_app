import {dispatcher} from '../flux';
import constants from './constants';

const toggle = (tab) => {
	dispatcher.dispatch({
		tab,
		actionType: constants.toggle,
	})
}

export default  {
	toggle
}

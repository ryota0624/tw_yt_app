import {dispatcher} from '../flux';
import constants from './constants';

const toggle = (tab) => {
	dispatcher.dispatch({
		tab,
		actionType: constants.toggle,
	})
}
const twPage = () => {
   dispatcher.dispatch({
		actionType: constants.twPage,
	})
}

module.exports = {
	toggle,
    twPage
}

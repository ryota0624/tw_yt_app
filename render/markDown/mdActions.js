import {dispatcher} from '../flux';
import constants from './constants';
const sendMd = (text) => {
	console.log(text)
	dispatcher.dispatch({
		text,
		actionType: constants.add,
	})
}

export default  {
	sendMd
}

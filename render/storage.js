const saveStorage = (name, state) => {
	window.localStorage[name] = JSON.stringify(state);
}

const loadStorage = (name) => window.localStorage[name]

const createStorage = (name, size) => {
	if(!window.localStorage[name]) {
		window.localStorage[name] = JSON.stringify({});
		console.log(window.localStorage[name])
	}
	return {
		saveStorage(state) {
			// if(state.length > size) state = state.slice(0, size);
			return window.localStorage[name] = JSON.stringify(state);
		},
		loadStorage() {
			return JSON.parse(window.localStorage[name]);
		}
	}
}

export default createStorage
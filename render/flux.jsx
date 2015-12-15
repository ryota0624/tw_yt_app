'use strict';
const React = require('react');
const flux  = require('flux');
const  Dispatcher = flux.Dispatcher;
const dispatcher = new Dispatcher();
const EventEmitter = require('events').EventEmitter;
const CHANGE_EVENT = 'change';

class Store extends EventEmitter {
  constructor(initialState) {
    if(!initialState) throw new ReferenceError('初期stateが与えられていませんs');
    super();
    this.state = initialState;
  }

  register(handler) {
    if(!handler) throw new ReferenceError('handlerが与えられていません');
    if(typeof handler !== 'function') throw new TypeError('handlerは関数です');
    dispatcher.register(handler);
  }

  get() {
    return this.state
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener( callback ) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

class Provider extends React.Component {
  constructor(props) {
    super(props);
    if(!props.store) throw new ReferenceError('storeが与えられていません');
    let store = {};
    const storeName = Object.getOwnPropertyNames(props.store);
    storeName.forEach(name => {
      store[name] = props.store[name].get();
    })
    this.state = {
      store,
      storeName
    }
  }
  
  componentWillUnmount() {
    const store = this.props.store;
    this.state.storeName.forEach(name => {
      store[name].removeChangeListener(this.onChange.bind(this));
    })
  }
  
  componentDidMount() {
    const store = this.props.store;
    this.state.storeName.forEach(name => {
      store[name].addChangeListener(this.onChange.bind(this));
    })
  }
  
  render() {
    const state = this.state.store;
    const dumb = this.props.children;
    return React.createElement(dumb,state)
  }
  
  onChange() {
    let store = {};
    this.state.storeName.forEach(name => {
      store[name] = this.props.store[name].get();
    });
    this.setState({store});
  }
  
}

module.exports = {Store, dispatcher, Provider};
"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _users = [];
var _loggedIn = false;

var UserStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},

	getAllUsers: function () {
		return _users;
	},

	getUserById: function(id) {
		return _.find(_users, {id: id});
	},

	checkExistedUsername: function(username) {
		var index = _.findIndex(_users, {username: username});
		return index !== -1 ? true : false;
	},

	checkExistedEmail: function(email) {
		var index = _.findIndex(_users, {email: email});
		return index !== -1 ? true : false;
	},

	isLoggedIn: function(){
		return _loggedIn;
	}
});

Dispatcher.register(function(action){
	switch (action.actionType) {
		case ActionTypes.INITIALIZE:
			_users = action.initialData.users;
			UserStore.emitChange();
			break;

		case ActionTypes.CREATE_USER:
			_users = action.users;
			UserStore.emitChange();
			break;

		case ActionTypes.UPDATE_USER:
			_users = action.users;
			UserStore.emitChange();
			break;

		case ActionTypes.DELETE_USER:
			_users = action.users;
			UserStore.emitChange();
			break;

		case ActionTypes.DELETE_GROUP_OF_USER:
			_users = action.users;
			UserStore.emitChange();
			break;

		case ActionTypes.LOGIN:
			_loggedIn = action.loggedIn;					
			UserStore.emitChange();
			break;

		default:
	}
});

module.exports = UserStore;
"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _groups = [];

var GroupStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAllGroups: function() {
		return _groups;
	},

	checkExistedGroup: function(name) {
		var index = _.findIndex(_groups, {name: name});
		return index !== -1 ? true : false;
	}
});

Dispatcher.register(function(action){
	switch (action.actionType) {
		case ActionTypes.INITIALIZE:
			_groups = action.initialData.groups;
			GroupStore.emitChange();
			break;

		case ActionTypes.CREATE_GROUP:
			_groups = action.groups;
			GroupStore.emitChange();
			break;

		case ActionTypes.DELETE_GROUP:
			_groups = action.groups;
			GroupStore.emitChange();
			break;

		default:
	}
});

module.exports = GroupStore;
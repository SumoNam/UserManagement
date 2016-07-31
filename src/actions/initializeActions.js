"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var UserService = require('../services/userService');
var GroupService = require('../services/groupService');
var data = require('../services/data');

var InitializeActions = {
		initApp: function() {
		var users = data.users;
		var groups = data.groups;

		if (!localStorage.getItem('users')) {
			localStorage.setItem('users', JSON.stringify(users));
		} else {
			users = JSON.parse(localStorage.getItem('users'));
		}

		if (!localStorage.getItem('groups')) {
			localStorage.setItem('groups', JSON.stringify(groups));
		} else {
			groups = JSON.parse(localStorage.getItem('groups'));
		}

		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				users: users,
				groups: groups
			}
		});
	}
};

module.exports = InitializeActions;
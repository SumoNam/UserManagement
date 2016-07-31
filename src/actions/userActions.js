"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var UserService = require('../services/userService');
var ActionTypes = require('../constants/actionTypes');

var UserActions = {
	createUser: function(user){
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_USER,
			users: UserService.saveUser(user)
		});
	},

	updateUser: function(user){
		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_USER,
			users: UserService.saveUser(user)
		});
	},

	deleteUsers: function(idList){
		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_USER,
			users: UserService.deleteUsers(idList)
		});
	},

	deleteUsersFromGroups: function(idList) {
		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_GROUP_OF_USER,
			users: UserService.deleteUsersFromGroups(idList)
		});
	},

	checkLoginUser: function(username, password) {
		var isExistedUser = UserService.checkLoginUser(username, password);

		Dispatcher.dispatch({
			actionType: ActionTypes.LOGIN,
			loggedIn: isExistedUser
		});
	}
};

module.exports = UserActions;
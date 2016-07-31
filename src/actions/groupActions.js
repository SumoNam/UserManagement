"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var GroupService = require('../services/groupService');
var ActionTypes = require('../constants/actionTypes');

var GroupActions = {
	createGroup: function(group){
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_GROUP,
			groups: GroupService.saveGroup(group)
		});
	},

	deleteGroups: function(idList){
		Dispatcher.dispatch({
			actionType: ActionTypes.DELETE_GROUP,
			groups: GroupService.deleteGroups(idList)
		});
	}
};

module.exports = GroupActions;
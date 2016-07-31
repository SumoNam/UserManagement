"use strict";

var data = require('./data');
var _ = require('lodash');

var UserService = function() {
	var users = JSON.parse(localStorage.getItem('users')) || data.users;

	function _storeUsers(usersList){
		localStorage.setItem('users', JSON.stringify(usersList));
	}

	function getAllUsers(){
		return users;
	}
	
	function getUserById(id){
		var user = _.find(users, {id: id});
		return user;
	}

	function saveUser(user){
		console.log('Saved the user to the DB via AJAX Call');
		if (user.id) {
			var existingUserIndex = _.findIndex(users, {id: user.id});
			users.splice(existingUserIndex, 1, user);
		} else {
			user.id = user.username;
			users.push(user);
		}

		_storeUsers(users);
		return users;
	}

	function deleteUsers(idList){
		console.log('Deleted the user from the DB via AJAX Call');
		for (var i = 0; i < idList.length; i++) {
			_.remove(users, {id: idList[i] });
		}

		if(users.length === 0){
			localStorage.removeItem('users');
		} else {
			_storeUsers(users);
		}

		return users;
	}

	function deleteUsersFromGroups(idList){
		console.log('Deleted the group of user the DB via AJAX Call');
		for (var i = 0; i < idList.length; i++) {
			var index = _.findIndex(users, {id: idList[i]});
			if(index !== -1){
				users[index].group = 'N/A';
			}
		}

		_storeUsers(users);
		return users;
	}

	function checkLoginUser(username, password){
		console.log('Check login user via AJAX Call');
		var index = _.findIndex(users, { 'username': username, 'password': password});
		return index !== -1 ? true : false;
	}

	return {
		getAllUsers: getAllUsers,
		saveUser: saveUser,
		deleteUsers: deleteUsers,
		deleteUsersFromGroups: deleteUsersFromGroups,
		checkLoginUser: checkLoginUser
	};
}();

module.exports = UserService;
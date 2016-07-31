"use strict";

var React = require('react');
var Router = require('react-router');
var UserStore = require('../../stores/userStore');

var AuthenticationMixins = {
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionTo: function (transition) {
			console.log('&*&*&* willTransitionTo for authenticated page. Next transition path:',
				transition.path, 'logged in:', UserStore.isLoggedIn());

			if (UserStore.isLoggedIn()) {
				//transition.redirect(transition.path);
			} else {
				transition.redirect('/login');
			}
		}
	}
};

module.exports = AuthenticationMixins;
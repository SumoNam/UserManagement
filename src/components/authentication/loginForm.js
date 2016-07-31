"use strict";

var React = require('react');
var Input = require('../common/textInput');

var Login = React.createClass({
	propTypes: {
		user: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		handleSubmit: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function() {
		return (
			<div>		
				<div className="login login-container">
					<h1>Welcome back !</h1>
					<img id="profile-img" className="profile-img-login" src="../../images/login-logo.png" />
					<p id="profile-name" className="profile-name-login"></p>
					<form className="form-signin" onSubmit={this.props.handleSubmit}>
						<Input
							name="username" 
							type="text"
							placeholder="Username"
							id="inputUsername"
							value={this.props.user.email}
							onChange={this.props.onChange}
							error={this.props.errors.email}/>

						<Input
							name="password" 
							type="password"
							placeholder="Password"
							id="inputPassword"
							value={this.props.user.password}
							onChange={this.props.onChange}
							error={this.props.errors.email}/>
						<br/>

						<button className="btn btn-lg btn-primary btn-signin" type="submit">Sign in</button>
					</form>
				</div>
			</div>
		);
	}
});

module.exports = Login;
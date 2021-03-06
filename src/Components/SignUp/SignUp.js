import React, { Component } from "react";
import AuthAPIService from "../../services/auth-api-service";
import "./SignUp.css";

export default class SignUp extends Component {
	state = {
		error: null,
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { email, password, confirmPassword } = e.target;
		this.setState({ error: null });

		if (password.value !== confirmPassword.value) {
			return this.setState({ error: "Passwords do not match" });
		}
		AuthAPIService.postUser({
			email: email.value,
			password: password.value,
		})
			.then((user) => {
				this.props.history.push("/login");
			})
			.catch((res) => {
				this.setState({ error: res.error });
			});
	};

	render() {
		return (
			<form className="form" onSubmit={this.handleSubmit}>
				{this.state.error && <p className="error">{this.state.error}</p>}
				<h1>Sign Up</h1>
				<label htmlFor="email">Email: </label>
				<br></br>
				<input htmlFor="email" type="email" name="email" required />
				<br></br>
				<label htmlFor="password">Password: </label>
				<br></br>
				<input htmlFor="password" type="password" name="password" required />
				<br></br>
				<label htmlFor="confirmPassword">Confirm Password:</label>
				<br></br>
				<input
					htmlFor="confirm-password"
					type="password"
					name="confirmPassword"
					required
				/>
				<br></br>
				<br></br>
				<button type="submit">Sign Up</button>
			</form>
		);
	}
}

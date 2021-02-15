import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import reflectImg from "../../reflectImg.png";
import "./ReflectionTile.css";

export default class ReflectionTile extends Component {
	render() {
		const { id, title, image_url, description, dateCreated } = this.props;
		let path = `/reflections/${id}`;
		let image = image_url ? image_url : reflectImg;
		console.log(dateCreated);
		return (
			<div className="tile">
				<Link className="tile-link" to={path}>
					<div key={id}>
						<h2>{title}</h2>
						<img src={image} alt="reflect-img" />
						<h3>"{description}"</h3>
						<p className="date">{moment(dateCreated).calendar()}</p>
					</div>
				</Link>
			</div>
		);
	}
}

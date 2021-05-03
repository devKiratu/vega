import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

function Vehicle({ id }) {
	const history = useHistory();
	const [vehicle, setVehicle] = useState();
	console.log("on render", vehicle);

	async function getVehicle() {
		const res = await fetch(`api/vehicles/${id}`);
		const data = await res.json();
		setVehicle(data);
	}

	async function handleDelete() {
		if (window.confirm("Do you want to delete this record?")) {
			console.log("record deleted", id);
			const res = await fetch(`api/vehicles/${id}`, {
				method: "DELETE",
			});
			const info = await res.json();
			console.log("from delete", info);
			history.push("/vehicles");
		}
	}

	useEffect(() => {
		getVehicle();
	}, []);
	return vehicle ? (
		<div className="my-4">
			<h2>Basics:</h2>
			<ul>
				<li>Make: {vehicle.make.name}</li>
				<li>Model: {vehicle.model.name}</li>
				<li>Registered: {vehicle.isRegistered ? "Yes" : "No"}</li>
			</ul>
			<h2>Features:</h2>
			<ul>
				{vehicle.features.map((f) => (
					<li key={f.id}>{f.name}</li>
				))}
			</ul>
			<h2>Contact:</h2>
			<ul>
				<li>Contact Name: {vehicle.contact.name}</li>
				<li>Contact Phone: {vehicle.contact.phone}</li>
				<li>Contact email: {vehicle.contact.email}</li>
			</ul>
			<Link to={`/vehicles/edit/${id}`}>
				<button className="btn btn-primary mr-3">Edit</button>
			</Link>
			<button className="btn btn-danger mr-3" onClick={handleDelete}>
				Delete
			</button>
			<Link to="/vehicles">
				<button className="btn btn-outline-dark">View All Vehicles</button>
			</Link>
		</div>
	) : (
		""
	);
}

export default Vehicle;

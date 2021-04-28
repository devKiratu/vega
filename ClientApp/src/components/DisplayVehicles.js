import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function DisplayVehicles() {
	const [vehicles, setVehicles] = useState([]);

	async function getVehicles() {
		const res = await fetch("api/vehicles", {
			method: "GET",
		});
		const data = await res.json();
		setVehicles(data);
		console.log("the vehicles are ", data);
	}

	useEffect(() => {
		getVehicles();
	}, []);

	return (
		<div>
			<NavLink to="/vehicles/new">
				<button className="btn btn-primary">Add Vehicle</button>
			</NavLink>
			<table className="table table-hover table-border my-5">
				<thead>
					<tr>
						<th>ID</th>
						<th>Make</th>
						<th>Model</th>
						<th>Contact Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{vehicles.map((v) => (
						<tr key={v.id}>
							<td>{v.id}</td>
							<td>{v.make.name}</td>
							<td>{v.model.name}</td>
							<td>{v.contact.name}</td>
							<td>
								<Link to="#">View</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default DisplayVehicles;

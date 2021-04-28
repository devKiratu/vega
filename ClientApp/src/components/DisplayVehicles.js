import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function DisplayVehicles() {
	const [vehicles, setVehicles] = useState([]);
	const [makes, setMakes] = useState([]);
	const [allVehicles, setAllVehicles] = useState([]);

	function filterVehicles(e) {
		const id = e.target.value;
		const filter = [...allVehicles];
		if (id !== "") {
			setVehicles(filter.filter((v) => v.make.id == id));
		} else {
			setVehicles(allVehicles);
		}

		// console.log(id);
	}

	async function getVehicles() {
		const res = await fetch("api/vehicles", {
			method: "GET",
		});
		const data = await res.json();
		setVehicles(data);
		setAllVehicles(data);
		// console.log("the vehicles are ", data);
	}

	async function GetMakes() {
		const res = await fetch("api/makes");
		const data = await res.json();
		setMakes(data);
	}

	useEffect(() => {
		getVehicles();
		GetMakes();
	}, []);

	return (
		<div>
			<NavLink to="/vehicles/new">
				<button className="btn btn-primary">Add Vehicle</button>
			</NavLink>
			<div className="form-group mt-3">
				<label htmlFor="makes" className="form-label">
					Select Make
				</label>
				<select
					name="makes"
					id="makes"
					className="form-select"
					onChange={filterVehicles}
				>
					<option value=""></option>
					{makes.map((m) => (
						<option key={m.id} value={m.id}>
							{m.name}
						</option>
					))}
				</select>
				<button className="btn btn-secondary mt-2" onClick={filterVehicles}>
					Reset
				</button>
			</div>

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
								<Link to={`/vehicles/${v.id}`}>Edit</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default DisplayVehicles;

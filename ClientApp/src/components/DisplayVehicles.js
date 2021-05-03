import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import PaginationComponent from "./PaginationComponent";

function DisplayVehicles() {
	const [vehicles, setVehicles] = useState([]);
	const [makes, setMakes] = useState([]);
	const [makeId, setMakeId] = useState();
	const [sortBy, setSortBy] = useState();
	const [isAsc, setIsAsc] = useState(false);
	const [totalRecords, setTotalRecords] = useState(9);
	const [page, setPage] = useState(1);
	const pageSize = 4;

	function filterVehicles(e) {
		const id = e.target.value;
		setMakeId(id);
	}

	function sortVehicles(e) {
		const column = e.target.id;
		setSortBy(column);
		setIsAsc(!isAsc);
	}

	async function getVehicles() {
		const res = await fetch(
			`api/vehicles/?MakeId=${makeId}&SortBy=${sortBy}&IsSortAscending=${isAsc}&Page=${page}&PageSize=${pageSize}`,
			{
				method: "GET",
			}
		);
		const data = await res.json();
		setVehicles(data);
	}

	async function GetMakes() {
		const res = await fetch("api/makes");
		const data = await res.json();
		setMakes(data);
	}

	useEffect(() => {
		getVehicles();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [makeId, sortBy, isAsc, page]);

	useEffect(() => {
		getVehicles();
		GetMakes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<NavLink to="/vehicles/new">
				<button className="btn btn-primary">Add Vehicle</button>
			</NavLink>
			<form>
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
					<button
						type="reset"
						className="btn btn-secondary mt-2"
						onClick={filterVehicles}
					>
						Reset
					</button>
				</div>
			</form>

			<table className="table table-hover table-border my-5">
				<thead>
					<tr>
						<th>ID</th>
						<th id="make" style={{ cursor: "pointer" }} onClick={sortVehicles}>
							Make
							{sortBy === "make" && (
								<FontAwesomeIcon
									icon={isAsc ? faSortUp : faSortDown}
									className="ml-2"
								/>
							)}
						</th>
						<th id="model" style={{ cursor: "pointer" }} onClick={sortVehicles}>
							Model
							{sortBy === "model" && (
								<FontAwesomeIcon
									icon={isAsc ? faSortUp : faSortDown}
									className="ml-2"
								/>
							)}
						</th>
						<th
							id="contactName"
							style={{ cursor: "pointer" }}
							onClick={sortVehicles}
						>
							Contact Name
							{sortBy === "contactName" && (
								<FontAwesomeIcon
									icon={isAsc ? faSortUp : faSortDown}
									className="ml-2"
								/>
							)}
						</th>
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
			<PaginationComponent
				total={totalRecords}
				pageSize={pageSize}
				page={page}
				setPage={setPage}
			/>
		</div>
	);
}

export default DisplayVehicles;

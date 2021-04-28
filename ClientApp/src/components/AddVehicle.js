import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import toast from "react-hot-toast";

const successToast = () =>
	toast.success("Vehicles register successfully updated", {
		duration: 5000,
		style: { backgroundColor: "#90EE90" },
	});

function AddVehicle() {
	const [makes, setMakes] = useState([]);
	const [makeId, setMakeId] = useState();
	const [modelId, setModelId] = useState();
	const [vmodel, setVModel] = useState([]);
	const [features, setFetures] = useState([]);
	const [isRegistered, setIsRegistered] = useState();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [selectedFeatures, setSelectedFeatures] = useState([]);
	const history = useHistory();
	const { id } = useParams();
	async function handleSubmit(e) {
		e.preventDefault();
		const requestObj = {
			modelId,
			isRegistered,
			contact: {
				name,
				email,
				phone,
			},
			features: [...selectedFeatures],
		};

		if (id) {
			const res = await fetch(`api/vehicles/${id}`, {
				method: "PUT",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(requestObj),
			});
			await res.json();
			res.status === 200 && successToast();
			// console.log("update data was: ", requestObj);
			// console.log("updated vehicle is: ", data);
		} else {
			const res = await fetch("api/vehicles", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(requestObj),
			});
			await res.json();
			res.status === 200 && successToast();

			// console.log("request data was: ", requestObj);
			// console.log("response data is: ", data);
		}
		history.push("/");
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

	function populateSelectedFeatures(e) {
		const id = parseInt(e.target.value);
		if (selectedFeatures.includes(id)) {
			setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
		} else {
			setSelectedFeatures([...selectedFeatures, id]);
		}
	}

	function populateModels() {
		makes.map(
			(m) => makeId && m.id === parseInt(makeId) && setVModel(m.models)
		);
	}

	useEffect(() => {
		populateModels();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [makeId]);

	async function GetMakes() {
		const res = await fetch("api/makes");
		const data = await res.json();
		setMakes(data);
	}
	async function getFeatures() {
		const res = await fetch("api/features");
		const data = await res.json();
		setFetures(data);
	}

	async function getVehicle(id) {
		const res = await fetch(`api/vehicles/${id}`);

		const data =
			res.status !== 404 ? await res.json() : history.push("/vehicles");
		if (data) {
			setIsRegistered(data.isRegistered);
			setSelectedFeatures(data.features.map((f) => f.id));
			setName(data.contact.name);
			setEmail(data.contact.email);
			setPhone(data.contact.phone);
			setMakeId(data.make.id);
			setModelId(data.model.id);
		}
	}

	useEffect(() => {
		GetMakes();
		getFeatures();
		if (id) {
			getVehicle(id);
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<h1>{id ? "Edit Vehicle" : "New Vehicle"}</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="make" className="form-label">
						Make
					</label>
					<select
						name="make"
						id="make"
						className="form-select"
						onChange={(e) => setMakeId(e.target.value)}
						value={makeId}
						required
					>
						<option value=""></option>
						{makes.map((make) => (
							<option key={make.id} value={make.id}>
								{make.name}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="model" className="form-label">
						Model
					</label>
					<select
						name="model"
						id="model"
						className="form-select"
						onChange={(e) => setModelId(e.target.value)}
						value={modelId}
						required
					>
						<option value=""></option>

						{makeId > 0
							? vmodel.map((m) => (
									<option key={m.id} value={m.id}>
										{m.name}
									</option>
							  ))
							: ""}
					</select>
				</div>
				<p>Is this vehicle registered?</p>
				<div className="form-check form-check-inline">
					<input
						type="radio"
						className="form-check-input"
						name="isRegistered"
						id="yes"
						onChange={() => setIsRegistered(true)}
						checked={isRegistered === true}
					/>
					<label htmlFor="yes" className="form-check-label">
						Yes
					</label>
				</div>
				<div className="form-check form-check-inline">
					<input
						type="radio"
						className="form-check-input"
						name="isRegistered"
						id="no"
						onChange={() => setIsRegistered(false)}
						checked={isRegistered === false}
					/>
					<label htmlFor="no" className="form-check-label">
						No
					</label>
				</div>
				<h2>Features</h2>
				{features.map((f) => (
					<div className="form-check" key={f.id}>
						<input
							type="checkbox"
							className="form-check-input"
							id={f.name}
							value={f.id}
							onChange={populateSelectedFeatures}
							checked={selectedFeatures.includes(f.id)}
						/>
						<label className="form-check-label" htmlFor={f.name}>
							{f.name}
						</label>
					</div>
				))}

				<h2>Contact</h2>
				<div className="form-group">
					<label htmlFor="contactName" className="form-label">
						Name
					</label>
					<input
						id="contactName"
						type="text"
						className="form-control"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="contactEmail" className="form-label">
						Email
					</label>
					<input
						id="contactEmail"
						type="email"
						className="form-control"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="contactPhone" className="form-label">
						Phone
					</label>
					<input
						id="contactPhone"
						type="tel"
						className="form-control"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
					/>
				</div>
				<button className="btn btn-primary">Save</button>
				{id && (
					<button
						type="button"
						className="btn btn-danger ml-3"
						onClick={handleDelete}
					>
						Delete
					</button>
				)}
			</form>
		</div>
	);
}

export default AddVehicle;

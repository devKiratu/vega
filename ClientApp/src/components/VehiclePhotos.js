import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VehiclePhotos({ p }) {
	const [photos, setPhotos] = useState([]);
	const { id } = useParams();

	async function handleUpload(e) {
		const formData = new FormData();
		const file = e.target.files[0];
		formData.append("file", file);
		const res = await fetch(`api/vehicles/${id}/photos`, {
			method: "POST",
			body: formData,
		});
		const photo = await res.json();
		setPhotos((prev) => [...prev, photo]);
		// console.log("i uploaded", photo);
	}

	async function GetPhotos() {
		// console.log("trying to fetch photos");
		const res = await fetch(`api/vehicles/${id}/photos`, {
			method: "GET",
		});
		const data = await res.json();
		// console.log("I fetched", data);
		setPhotos(data);
	}

	useEffect(() => {
		GetPhotos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [p]);

	return (
		<div className="my-3">
			<h3>Upload Photo</h3>
			<input
				type="file"
				name="file"
				accept=".jpg, .jpeg, .png"
				onChange={handleUpload}
			/>

			<hr />
			<h3>Vehicle Photos</h3>
			{photos.map((p) => (
				<img
					key={p.id}
					src={`/uploads/${p.fileName}`}
					alt={p.fileName}
					className="img-thumbnail"
				/>
			))}
		</div>
	);
}

export default VehiclePhotos;

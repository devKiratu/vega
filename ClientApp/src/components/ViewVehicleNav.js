import React from "react";
import { Link } from "react-router-dom";

function ViewVehicleNav({ photos, setPhotos, vehicle, setVehicle }) {
	function toggleView() {
		setPhotos(!photos);
		setVehicle(!vehicle);
	}
	return (
		<div>
			<ul className="nav nav-tabs">
				<li className="nav-item">
					<Link
						to="#"
						className={vehicle ? "nav-link active" : "nav-link"}
						onClick={toggleView}
					>
						Vehicle
					</Link>
				</li>
				<li className="nav-item">
					<Link
						to="#"
						className={photos ? "nav-link active" : "nav-link"}
						onClick={toggleView}
					>
						Photos
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default ViewVehicleNav;

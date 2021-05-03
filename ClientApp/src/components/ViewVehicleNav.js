import React from "react";
import { Link } from "react-router-dom";

function ViewVehicleNav() {
	return (
		<div>
			<ul className="nav nav-tabs">
				<li className="nav-item">
					<Link to="#" className="nav-link active">
						Vehicle
					</Link>
				</li>
				<li className="nav-item">
					<Link to="#" className="nav-link">
						Photos
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default ViewVehicleNav;

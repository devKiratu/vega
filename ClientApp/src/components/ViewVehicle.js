import React from "react";
import { useParams } from "react-router-dom";
import Vehicle from "./Vehicle";
import ViewVehicleNav from "./ViewVehicleNav";

function ViewVehicle() {
	const { id } = useParams();
	return (
		<div>
			<ViewVehicleNav />
			<Vehicle id={id} />
		</div>
	);
}

export default ViewVehicle;

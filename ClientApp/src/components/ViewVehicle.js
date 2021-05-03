import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Vehicle from "./Vehicle";
import VehiclePhotos from "./VehiclePhotos";
import ViewVehicleNav from "./ViewVehicleNav";

function ViewVehicle() {
	const [photos, setPhotos] = useState(false);
	const [vehicle, setVehicle] = useState(true);
	const { id } = useParams();
	return (
		<div>
			<ViewVehicleNav
				photos={photos}
				setPhotos={setPhotos}
				vehicle={vehicle}
				setVehicle={setVehicle}
			/>
			{vehicle ? <Vehicle id={id} /> : <VehiclePhotos />}
		</div>
	);
}

export default ViewVehicle;

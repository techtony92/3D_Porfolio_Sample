import React from "react";
import { Html, useProgress } from "@react-three/drei";
const Loader = () => {
	const { progress } = useProgress();
	return (
		<Html>
			<span className="canvas-load">
				<p style={{ fontSize: 14, color: "#f1f1ff1", fontWeight: "bold" }}>
					{progress.toFixed(2)}%
				</p>
			</span>
		</Html>
	);
};

export default Loader;

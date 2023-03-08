import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
type ComputerMeshProps = {
	isMobile: boolean;
};
const Computers = ({ isMobile }: ComputerMeshProps) => {
	const computer = useGLTF("./desktop_pc/scene.gltf");
	return (
		<mesh>
			<hemisphereLight intensity={0.15} groundColor="black" />
			<pointLight intensity={1} />
			<spotLight
				position={[-20, 50, 10]}
				angle={0.12}
				penumbra={1}
				intensity={1}
				castShadow
				shadow-mapSize={1024}
			/>

			<primitive
				object={computer.scene} // scene we want to render
				scale={isMobile ? 0.5 : 0.75} // scale size
				position={isMobile ? [0, -1, -1.3] : [0, -3.25, -1.5]} // [z-axis,y-axis, x-axis]
			/>
		</mesh>
	);
};

const ComputersCanvas = () => {
	// useState hook for mobile screens
	const [isMobile, setIsMobile] = useState(false);

	// UseEffect hook for mobile
	useEffect(() => {
		// Add a listener for changes to the screen size
		const mediaQuery = window.matchMedia("(max-width:500px)");

		// Set the inital value of the `isMobile` state variable
		setIsMobile(mediaQuery.matches);

		// Define a callback function to handle changes to the media query
		const handleMediaQueryChange = (event: MediaQueryListEvent) => {
			setIsMobile(event.matches);
		};

		// Add the callback function as a listener for changes to the media query
		mediaQuery.addEventListener("change", handleMediaQueryChange);

		// Use Effect cleanup!! Always remove your event listeners
		return () =>
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
	}, []);
	return (
		<Canvas
			frameloop="demand"
			shadows
			camera={{ position: [20, 3, 5], fov: 25 }}
			gl={{ preserveDrawingBuffer: true }}
		>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls // Allows for orbiting inside the canvas
					enableZoom={false} // Disables Zooming in and out
					maxPolarAngle={Math.PI / 2} // Restricts Rotation on a specific axis
					minPolarAngle={Math.PI / 2} // Restricts Rotation on a specific axis
				/>
				<Computers isMobile={isMobile} />
			</Suspense>
			<Preload all />
		</Canvas>
	);
};

export default ComputersCanvas;

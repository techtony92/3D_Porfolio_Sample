import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
	OrbitControls,
	Decal,
	Float,
	Preload,
	useTexture,
} from "@react-three/drei";
import CanvasLoader from "../Loader";
type ballProps = {
	imgUrl: string;
};
type ballCanvasProps = {
	icon: string;
};
const Ball = ({ imgUrl }: ballProps) => {
	const [decal] = useTexture([imgUrl]);
	return (
		<Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
			<ambientLight intensity={0.25} />
			<directionalLight position={[0, 0, 0.05]} />
			<mesh castShadow receiveShadow scale={2.75}>
				<icosahedronBufferGeometry args={[1, 1]} />
				<meshStandardMaterial
					color="#fff8eb"
					polygonOffset
					polygonOffsetFactor={5}
					flatShading
				/>
				<Decal
					position={[0, 0, 1]}
					rotation={[2 * Math.PI, 0, 6.25]}
					map={decal}
					flatShading
				/>
			</mesh>
		</Float>
	);
};

const BallCanvas = ({ icon }: ballCanvasProps) => {
	return (
		<Canvas frameloop="demand" gl={{ preserveDrawingBuffer: true }}>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls // Allows for orbiting inside the canvas
					enableZoom={false} // Disables Zooming in and out
				/>
				<Ball imgUrl={icon} />
			</Suspense>
			<Preload all />
		</Canvas>
	);
};
export default BallCanvas;

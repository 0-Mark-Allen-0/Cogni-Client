// "use client";

// import type React from "react";

// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";
// import { Suspense, useEffect, useRef, useState } from "react";
// import * as THREE from "three";

// // Load 3D Model
// const Model: React.FC = () => {
//   const { scene } = useGLTF("/models/Quest3.glb");
//   return <primitive object={scene} scale={1.5} />;
// };

// const createCameraPath = () => {
//   const points = [];
//   const totalFrames = 480; // 8 seconds at 60fps
//   const radius = 2.2;
//   const initialHeight = 0.3;
//   const finalHeight = -0.02;

//   for (let i = 0; i < totalFrames; i++) {
//     const progress = i / (totalFrames - 1);
//     const easeProgress = 1 - Math.pow(1 - progress, 3);

//     // Rotation phase (0-50% of animation)
//     const rotationProgress = Math.min(easeProgress / 0.5, 1);
//     const angle = rotationProgress * Math.PI;

//     // Zoom phase (30-100% of animation) - consistent speed
//     const zoomStart = 0.3;
//     const zoomProgress =
//       easeProgress > zoomStart
//         ? (easeProgress - zoomStart) / (1 - zoomStart)
//         : 0;
//     const zoomEase = zoomProgress; // Linear zoom for consistent speed

//     const currentRadius = radius * (1 - zoomEase * 0.85);
//     const y =
//       initialHeight * (1 - easeProgress * 0.7) +
//       finalHeight * (easeProgress * 0.7);

//     let position: [number, number, number];
//     let lookAt: [number, number, number];

//     if (zoomProgress < 0.9) {
//       // Circular rotation with consistent zoom
//       position = [
//         Math.sin(angle) * currentRadius,
//         y,
//         Math.cos(angle) * currentRadius,
//       ];
//       lookAt = [0, y * 0.5, 0];
//     } else {
//       // Final approach - maintain consistent movement
//       const finalProgress = (zoomProgress - 0.9) / 0.1;
//       const stableAngle = Math.PI;

//       position = [
//         Math.sin(stableAngle) * currentRadius,
//         y,
//         Math.cos(stableAngle) * currentRadius,
//       ];
//       lookAt = [0, y * 0.5, -0.1];
//     }

//     points.push({ position, lookAt });
//   }

//   return points;
// };

// // Smooth camera animation controller
// const CameraController = ({
//   animationProgress,
// }: {
//   animationProgress: number;
// }) => {
//   const { camera } = useThree();
//   const cameraPath = useRef(createCameraPath());

//   useFrame(() => {
//     const pathIndex = Math.floor(
//       animationProgress * (cameraPath.current.length - 1)
//     );
//     const clampedIndex = Math.min(pathIndex, cameraPath.current.length - 1);
//     const point = cameraPath.current[clampedIndex];

//     const targetPosition = new THREE.Vector3(...point.position);
//     const targetLookAt = new THREE.Vector3(...point.lookAt);

//     camera.position.lerp(targetPosition, 0.1);
//     camera.lookAt(targetLookAt);
//   });

//   return null;
// };

// // Hook to detect mobile
// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);

//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   return isMobile;
// };

// // Main component
// export default function VRHeadsetViewer() {
//   const [showIntro, setShowIntro] = useState(true);
//   const [animationStarted, setAnimationStarted] = useState(false);
//   const [animationProgress, setAnimationProgress] = useState(0);
//   const [showVideo, setShowVideo] = useState(false);
//   const [fadeOpacity, setFadeOpacity] = useState(0);
//   const [lightIntensity, setLightIntensity] = useState(0.6);

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const animationRef = useRef<number>();
//   const startTimeRef = useRef<number>();
//   const isMobile = useIsMobile();

//   // Handle scroll trigger for desktop and touch for mobile
//   useEffect(() => {
//     const handleInteraction = () => {
//       if (showIntro) {
//         setShowIntro(false);
//         setTimeout(() => {
//           setAnimationStarted(true);
//           startTimeRef.current = Date.now();
//         }, 500);
//       }
//     };

//     // Add both wheel (desktop) and touch (mobile) event listeners
//     window.addEventListener("wheel", handleInteraction, { once: true });
//     window.addEventListener("touchstart", handleInteraction, { once: true });

//     return () => {
//       window.removeEventListener("wheel", handleInteraction);
//       window.removeEventListener("touchstart", handleInteraction);
//     };
//   }, [showIntro]);

//   useEffect(() => {
//     if (!animationStarted) return;

//     const animationDuration = 8000; // 8 seconds

//     const animate = () => {
//       if (!startTimeRef.current) return;

//       const elapsed = Date.now() - startTimeRef.current;
//       const progress = Math.min(elapsed / animationDuration, 1);

//       setAnimationProgress(progress);
//       setLightIntensity(0.6 + progress * 1.2);

//       // Gradual fade starts when zoom begins (30% progress)
//       if (progress >= 0.3) {
//         const zoomProgress = (progress - 0.3) / 0.7; // 0 to 1 over the zoom phase

//         // Fade in to white, then fade out to reveal video
//         if (zoomProgress <= 0.6) {
//           // Fade to white (0 to 60% of zoom)
//           const fadeInProgress = zoomProgress / 0.6;
//           setFadeOpacity(fadeInProgress);
//         } else if (zoomProgress <= 0.7) {
//           // Hold white and switch to video (60% to 70% of zoom)
//           setFadeOpacity(1);
//           if (!showVideo) {
//             setShowVideo(true);
//             setTimeout(() => {
//               if (videoRef.current) {
//                 videoRef.current.play().catch(console.error);
//               }
//             }, 100);
//           }
//         } else {
//           // Fade out from white to reveal video (70% to 100% of zoom)
//           const fadeOutProgress = (zoomProgress - 0.7) / 0.3;
//           setFadeOpacity(1 - fadeOutProgress);
//         }
//       }

//       if (progress < 1) {
//         animationRef.current = requestAnimationFrame(animate);
//       }
//     };

//     animationRef.current = requestAnimationFrame(animate);

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [animationStarted, showVideo]);

//   return (
//     <div className="relative w-full h-screen overflow-hidden bg-white">
//       {/* 3D Scene */}
//       {!showVideo && (
//         <Canvas
//           camera={{
//             position: [0, 0.3, 2.2],
//             fov: isMobile ? 85 : 75, // Wider field of view for mobile
//           }}
//           className="absolute inset-0"
//           dpr={[1, 2]} // Optimize for mobile performance
//         >
//           <ambientLight intensity={lightIntensity * 0.4} />
//           <directionalLight
//             position={[5, 5, 5]}
//             intensity={lightIntensity}
//             castShadow
//           />
//           <pointLight
//             position={[-3, 2, 3]}
//             intensity={lightIntensity * 0.3}
//             color="#4f46e5"
//           />

//           <Suspense fallback={null}>
//             <Model />
//           </Suspense>

//           <CameraController animationProgress={animationProgress} />
//         </Canvas>
//       )}

//       {/* Intro Screen */}
//       {showIntro && (
//         <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black z-20 transition-opacity duration-500 px-4">
//           {/* Ambient glow effects */}
//           <div className="absolute -rotate-45 -right-20 top-20 w-96 h-96 bg-[#24ffe9]/20 rounded-full blur-3xl"></div>
//           <div className="absolute rotate-12 -left-20 bottom-20 w-96 h-96 bg-[#00a8c9]/20 rounded-full blur-3xl"></div>
//           <div className="absolute rotate-45 left-40 top-20 w-64 h-64 bg-[#4f46e5]/15 rounded-full blur-3xl"></div>
//           <div className="absolute -rotate-12 right-40 bottom-20 w-80 h-80 bg-[#a855f7]/15 rounded-full blur-3xl"></div>

//           <div className="text-center z-10 max-w-4xl mx-auto">
//             <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">
//               Enter the World of VR
//             </h1>
//             <p className="text-lg md:text-xl text-white mb-8 md:mb-12 font-light">
//               <span className="hidden md:inline">
//                 Scroll to begin your journey
//               </span>
//               <span className="md:hidden">Touch to begin your journey</span>
//             </p>
//             <div className="animate-bounce">
//               <svg
//                 className="w-6 h-6 md:w-8 md:h-8 text-white mx-auto"
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
//               </svg>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Video */}
//       {showVideo && (
//         <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
//           <video
//             ref={videoRef}
//             src="/videos/landing_video.mp4"
//             autoPlay
//             loop
//             muted
//             playsInline
//             className={`${
//               isMobile
//                 ? "w-full h-full object-cover" // Fit entire video on mobile
//                 : "w-full h-full object-cover" // Cover full screen on desktop
//             }`}
//           />
//         </div>
//       )}

//       {/* Fade Overlay */}
//       <div
//         className="absolute inset-0 bg-white pointer-events-none z-30"
//         style={{ opacity: fadeOpacity }}
//       />
//     </div>
//   );
// }

// "use client";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { useGLTF } from "@react-three/drei";
// import { Suspense, useEffect, useRef, useState } from "react";
// import * as THREE from "three";

// // Load 3D Model
// const Model: React.FC = () => {
//   const { scene } = useGLTF("/models/Quest3.glb");
//   return <primitive object={scene} scale={1.5} />;
// };

// // Improved camera path with controlled rotation and direct lens approach
// const createCameraPath = (numPoints = 120) => {
//   // Reduced points for faster progression
//   const path = [];
//   const radius = 3.6;
//   const initialHeight = 0.5;
//   const finalHeight = -0.1; // Lower final height to see lens area better

//   const lensTarget: [number, number, number] = [0, 0, -0.3];

//   for (let i = 0; i < numPoints; i++) {
//     const progress = i / (numPoints - 1);

//     // Control rotation to stop at 180 degrees and transition to direct approach
//     let angle;
//     if (progress <= 0.7) {
//       // Complete 180-degree rotation by 70% progress
//       angle = (progress / 0.7) * Math.PI;
//     } else {
//       // Stop rotation at 180 degrees (Math.PI)
//       angle = Math.PI;
//     }

//     const y = initialHeight * (1 - progress) + finalHeight * progress;

//     let adjustedRadius = radius;

//     // Revised zoom stages for smoother and faster progression
//     if (progress > 0.6 && progress <= 0.75) {
//       // Start zooming earlier
//       const zoomProgress = (progress - 0.6) / 0.15;
//       adjustedRadius = radius * (1 - zoomProgress * 0.4); // More aggressive zoom
//     } else if (progress > 0.75 && progress <= 0.85) {
//       const extraZoomProgress = (progress - 0.75) / 0.1;
//       adjustedRadius = radius * (0.6 - extraZoomProgress * 0.25);
//     } else if (progress > 0.85 && progress <= 0.92) {
//       const fineZoomProgress = (progress - 0.85) / 0.07;
//       adjustedRadius = radius * (0.35 - fineZoomProgress * 0.2);
//     } else if (progress > 0.92) {
//       const finalZoomProgress = (progress - 0.92) / 0.08;
//       adjustedRadius = radius * (0.15 - finalZoomProgress * 0.12);
//     }

//     let position: [number, number, number];
//     let lookAt: [number, number, number] = [0, y, 0];

//     if (progress <= 0.7) {
//       // Normal circular rotation
//       position = [
//         Math.sin(angle) * adjustedRadius,
//         y,
//         Math.cos(angle) * adjustedRadius,
//       ];
//     } else if (progress > 0.7 && progress < 0.95) {
//       // Transition from back of headset to direct lens approach
//       const transitionProgress = (progress - 0.7) / 0.25;
//       const backPosition = [0, y, -adjustedRadius]; // Back of headset
//       const lensPosition = [0, -0.05, -0.15]; // Final lens position

//       position = [
//         backPosition[0] * (1 - transitionProgress) +
//           lensPosition[0] * transitionProgress,
//         backPosition[1] * (1 - transitionProgress) +
//           lensPosition[1] * transitionProgress,
//         backPosition[2] * (1 - transitionProgress) +
//           lensPosition[2] * transitionProgress,
//       ];
//     } else {
//       // Final lens positioning - lower and more centered
//       position = [0, -0.05, -0.15]; // Lower position to see lens area better
//       lookAt = [0, 0, -0.3]; // Look directly at lens
//     }

//     path.push({ position, lookAt });
//   }

//   return path;
// };

// // Improved camera controller with faster correction
// const SmoothCameraController = ({ progress }: { progress: number }) => {
//   const { camera } = useThree();
//   const cameraPath = useRef(createCameraPath());
//   const prevProgress = useRef(progress);
//   const lerpFactor = useRef(0.12); // Increased base lerp factor for faster correction

//   useFrame(() => {
//     // Faster progress smoothing for quicker response
//     prevProgress.current += (progress - prevProgress.current) * 0.2; // Increased from 0.15
//     const smoothProgress = prevProgress.current;

//     const exactIndex = smoothProgress * (cameraPath.current.length - 1);
//     const index = Math.floor(exactIndex);
//     const nextIndex = Math.min(index + 1, cameraPath.current.length - 1);
//     const t = exactIndex - index;

//     const currentPoint = cameraPath.current[index];
//     const nextPoint = cameraPath.current[nextIndex];

//     const targetPosition = new THREE.Vector3(
//       currentPoint.position[0] * (1 - t) + nextPoint.position[0] * t,
//       currentPoint.position[1] * (1 - t) + nextPoint.position[1] * t,
//       currentPoint.position[2] * (1 - t) + nextPoint.position[2] * t
//     );

//     const targetLookAt = new THREE.Vector3(
//       currentPoint.lookAt[0] * (1 - t) + nextPoint.lookAt[0] * t,
//       currentPoint.lookAt[1] * (1 - t) + nextPoint.lookAt[1] * t,
//       currentPoint.lookAt[2] * (1 - t) + nextPoint.lookAt[2] * t
//     );

//     // Much faster correction based on progress - more aggressive lerp factors
//     if (progress > 0.85 && progress <= 0.92) {
//       lerpFactor.current = 0.15; // Faster correction in zoom phase
//     } else if (progress > 0.92) {
//       lerpFactor.current = 0.18; // Even faster for final positioning
//     } else {
//       // More responsive correction throughout
//       const progressDelta = Math.abs(progress - prevProgress.current);
//       lerpFactor.current = 0.12 + progressDelta * 4; // Higher base and multiplier
//     }

//     // Faster camera position correction
//     camera.position.lerp(targetPosition, lerpFactor.current);

//     const currentLookAt = new THREE.Vector3();
//     camera.getWorldDirection(currentLookAt);
//     currentLookAt.multiplyScalar(5).add(camera.position);

//     const smoothLookAt = new THREE.Vector3()
//       .copy(currentLookAt)
//       .lerp(targetLookAt, lerpFactor.current);
//     camera.lookAt(smoothLookAt);
//   });

//   return null;
// };

// // Main Model Viewer with improved transitions
// export default function ScrollVid() {
//   const [progress, setProgress] = useState(0);
//   const [scrollLocked, setScrollLocked] = useState(true);
//   const [lightIntensity, setLightIntensity] = useState(0.5);
//   const [showVideo, setShowVideo] = useState(false);
//   const [showIntroSlide, setShowIntroSlide] = useState(true);
//   const [introSlideOpacity, setIntroSlideOpacity] = useState(1);
//   const [hasScrolled, setHasScrolled] = useState(false);
//   const [fadeTransition, setFadeTransition] = useState(false);
//   const [fadeOpacity, setFadeOpacity] = useState(0);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const lastScrollTime = useRef(Date.now());
//   const scrollInertia = useRef(0);
//   const fadeAnimationRef = useRef<number | null>(null);
//   const introFadeAnimationRef = useRef<number | null>(null);
//   const canAdvanceProgress = useRef(false);

//   // Handle black fade transition with direct model-to-video transition
//   useEffect(() => {
//     if (fadeTransition) {
//       let startTime = Date.now();
//       let duration = 1000; // Reduced duration (1 second total)

//       const animateFade = () => {
//         const elapsed = Date.now() - startTime;
//         const progress = Math.min(elapsed / duration, 1);

//         if (progress < 0.5) {
//           // Fade to black from model
//           setFadeOpacity(progress * 2);
//           fadeAnimationRef.current = requestAnimationFrame(animateFade);
//         } else if (progress === 0.5 || (progress > 0.5 && !showVideo)) {
//           // At midpoint, switch to video immediately
//           setFadeOpacity(1);
//           if (!showVideo) {
//             setShowVideo(true);
//             // Attempt to play video
//             setTimeout(() => {
//               if (videoRef.current) {
//                 videoRef.current
//                   .play()
//                   .catch((err) => console.error("Video play failed:", err));
//               }
//             }, 50);
//           }
//           fadeAnimationRef.current = requestAnimationFrame(animateFade);
//         } else if (progress < 1) {
//           // Fade from black to video
//           const fadeOutProgress = (progress - 0.5) / 0.5;
//           setFadeOpacity(1 - fadeOutProgress);
//           fadeAnimationRef.current = requestAnimationFrame(animateFade);
//         } else {
//           setFadeOpacity(0);
//           setFadeTransition(false);
//         }
//       };

//       fadeAnimationRef.current = requestAnimationFrame(animateFade);

//       return () => {
//         if (fadeAnimationRef.current) {
//           cancelAnimationFrame(fadeAnimationRef.current);
//         }
//       };
//     }
//   }, [fadeTransition, showVideo]);

//   // Handle intro slide fade animation
//   useEffect(() => {
//     if (hasScrolled && showIntroSlide) {
//       let startTime = Date.now();
//       let duration = 500;

//       const animateIntroFade = () => {
//         const elapsed = Date.now() - startTime;
//         const progress = Math.min(elapsed / duration, 1);

//         if (progress < 1) {
//           setIntroSlideOpacity(1 - progress);
//           introFadeAnimationRef.current =
//             requestAnimationFrame(animateIntroFade);
//         } else {
//           setIntroSlideOpacity(0);
//           setShowIntroSlide(false);
//           canAdvanceProgress.current = true;
//         }
//       };

//       introFadeAnimationRef.current = requestAnimationFrame(animateIntroFade);

//       return () => {
//         if (introFadeAnimationRef.current) {
//           cancelAnimationFrame(introFadeAnimationRef.current);
//         }
//       };
//     }
//   }, [hasScrolled, showIntroSlide]);

//   useEffect(() => {
//     if (!showIntroSlide) {
//       canAdvanceProgress.current = true;
//     }
//   }, [showIntroSlide]);

//   // Enhanced scroll handling with faster response
//   useEffect(() => {
//     const handleScroll = (event: WheelEvent) => {
//       if (!hasScrolled) {
//         setHasScrolled(true);
//       }

//       if (scrollLocked) {
//         event.preventDefault();

//         const now = Date.now();
//         const timeDelta = now - lastScrollTime.current;
//         lastScrollTime.current = now;

//         // Increased scroll sensitivity for faster rotation
//         const scrollInput = event.deltaY * 0.0004; // Increased from 0.00025
//         scrollInertia.current =
//           Math.sign(scrollInput) *
//           Math.min(Math.abs(scrollInertia.current + scrollInput), 0.012); // Increased max

//         // Faster inertia decay
//         if (timeDelta > 40) {
//           // Reduced from 50
//           scrollInertia.current *= 0.75; // Increased dampening from 0.7
//         }

//         if (canAdvanceProgress.current) {
//           setProgress((prev) => {
//             const newProgress = Math.min(
//               1,
//               Math.max(0, prev + scrollInertia.current)
//             );

//             const extraLightBoost =
//               newProgress > 0.85 ? (newProgress - 0.85) * 2 : 0;
//             setLightIntensity(0.5 + newProgress * 1.5 + extraLightBoost);

//             // Trigger fade transition instead of pulse
//             if (newProgress >= 0.98 && !fadeTransition && !showVideo) {
//               setFadeTransition(true);
//               setScrollLocked(false);
//             }

//             return newProgress;
//           });
//         }
//       }
//     };

//     // Faster inertia application
//     const applyInertia = () => {
//       if (Math.abs(scrollInertia.current) > 0.0001 && scrollLocked) {
//         scrollInertia.current *= 0.9; // Faster decay from 0.88

//         if (canAdvanceProgress.current) {
//           setProgress((prev) => {
//             const newProgress = Math.min(
//               1,
//               Math.max(0, prev + scrollInertia.current)
//             );

//             const extraLightBoost =
//               newProgress > 0.85 ? (newProgress - 0.85) * 2 : 0;
//             setLightIntensity(0.5 + newProgress * 1.5 + extraLightBoost);

//             if (newProgress >= 0.98 && !fadeTransition && !showVideo) {
//               setFadeTransition(true);
//               setScrollLocked(false);
//             }

//             return newProgress;
//           });
//         }
//       }

//       requestAnimationFrame(applyInertia);
//     };

//     window.addEventListener("wheel", handleScroll, { passive: false });
//     const inertiaFrame = requestAnimationFrame(applyInertia);

//     return () => {
//       window.removeEventListener("wheel", handleScroll);
//       cancelAnimationFrame(inertiaFrame);
//     };
//   }, [scrollLocked, fadeTransition, showVideo, hasScrolled, showIntroSlide]);

//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* 3D Canvas Scene */}
//       {!showVideo && (
//         <Canvas
//           camera={{ position: [0, 0.5, 3.6], fov: 65 }}
//           className="fixed top-0 left-0 w-full h-full"
//         >
//           <ambientLight intensity={lightIntensity} />
//           <directionalLight position={[5, 5, 5]} intensity={lightIntensity} />

//           <Suspense fallback={null}>
//             <Model />
//           </Suspense>

//           <SmoothCameraController progress={progress} />
//         </Canvas>
//       )}

//       {/* Intro Slide with Bloom Effects */}
//       {showIntroSlide && (
//         <div
//           className="absolute inset-0 flex flex-col justify-center items-center bg-gray-800 z-30 overflow-hidden"
//           style={{ opacity: introSlideOpacity, transition: "opacity 0.5s" }}
//         >
//           <div className="absolute -rotate-45 -right-20 top-20 w-96 h-96 bg-[#24ffe9]/20 rounded-full blur-3xl"></div>
//           <div className="absolute rotate-12 -left-20 bottom-20 w-96 h-96 bg-[#00a8c9]/20 rounded-full blur-3xl"></div>
//           <div className="absolute rotate-45 left-40 top-20 w-64 h-64 bg-[#4f46e5]/15 rounded-full blur-3xl"></div>
//           <div className="absolute -rotate-12 right-40 bottom-20 w-80 h-80 bg-[#a855f7]/15 rounded-full blur-3xl"></div>

//           <h1 className="text-5xl font-bold text-white mb-6 z-10 relative">
//             Enter the world of VR
//           </h1>
//           <p className="text-xl text-white mb-12 z-10 relative">
//             Scroll to continue
//           </p>
//           <div className="animate-bounce z-10 relative">
//             <svg
//               className="w-8 h-8 text-white"
//               fill="none"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
//             </svg>
//           </div>
//         </div>
//       )}

//       {/* Black Fade Transition Overlay */}
//       <div
//         className="absolute inset-0 bg-black transition-opacity duration-100 z-20"
//         style={{ opacity: fadeOpacity }}
//       ></div>

//       {/* Video that replaces 3D model at the end */}
//       {showVideo && (
//         <div className="absolute inset-0 flex justify-center items-center bg-black z-10">
//           <video
//             ref={videoRef}
//             src="/videos/sample.mp4"
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}

//       {/* Debug indicators */}
//       <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded z-30">
//         <div>Progress: {Math.round(progress * 100)}%</div>
//         <div>Intro: {showIntroSlide ? "Visible" : "Hidden"}</div>
//         <div>Can Advance: {canAdvanceProgress.current ? "Yes" : "No"}</div>
//       </div>
//     </div>
//   );
// }

//v2.
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
//               <span className="md:hidden">
//                 Rotate your phone to landscape, and touch the screen!
//               </span>
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

//v3 Loading Screen
// "use client";

// import type React from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { useGLTF, useProgress } from "@react-three/drei";
// import { Suspense, useEffect, useRef, useState } from "react";
// import * as THREE from "three";

// // Load 3D Model
// const Model: React.FC = () => {
//   const { scene } = useGLTF("/models/Quest3.glb");
//   return <primitive object={scene} scale={1.5} />;
// };

// // Camera Path
// const createCameraPath = () => {
//   const points = [];
//   const totalFrames = 480;
//   const radius = 2.2;
//   const initialHeight = 0.3;
//   const finalHeight = -0.02;

//   for (let i = 0; i < totalFrames; i++) {
//     const progress = i / (totalFrames - 1);
//     const easeProgress = 1 - Math.pow(1 - progress, 3);

//     const rotationProgress = Math.min(easeProgress / 0.5, 1);
//     const angle = rotationProgress * Math.PI;

//     const zoomStart = 0.3;
//     const zoomProgress =
//       easeProgress > zoomStart
//         ? (easeProgress - zoomStart) / (1 - zoomStart)
//         : 0;

//     const currentRadius = radius * (1 - zoomProgress * 0.85);
//     const y =
//       initialHeight * (1 - easeProgress * 0.7) +
//       finalHeight * (easeProgress * 0.7);

//     let position: [number, number, number];
//     let lookAt: [number, number, number];

//     if (zoomProgress < 0.9) {
//       position = [
//         Math.sin(angle) * currentRadius,
//         y,
//         Math.cos(angle) * currentRadius,
//       ];
//       lookAt = [0, y * 0.5, 0];
//     } else {
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
//     const point =
//       cameraPath.current[Math.min(pathIndex, cameraPath.current.length - 1)];

//     const targetPosition = new THREE.Vector3(...point.position);
//     const targetLookAt = new THREE.Vector3(...point.lookAt);

//     camera.position.lerp(targetPosition, 0.1);
//     camera.lookAt(targetLookAt);
//   });

//   return null;
// };

// // Detect Mobile
// const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);
//   return isMobile;
// };

// // Main Component
// export default function VRHeadsetViewer() {
//   const [showIntro, setShowIntro] = useState(false);
//   const [animationStarted, setAnimationStarted] = useState(false);
//   const [animationProgress, setAnimationProgress] = useState(0);
//   const [showVideo, setShowVideo] = useState(false);
//   const [fadeOpacity, setFadeOpacity] = useState(0);
//   const [lightIntensity, setLightIntensity] = useState(0.6);
//   const [assetsLoaded, setAssetsLoaded] = useState(false);

//   const { progress } = useProgress();
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const animationRef = useRef<number>();
//   const startTimeRef = useRef<number>();
//   const isMobile = useIsMobile();

//   // Preload video
//   useEffect(() => {
//     const video = document.createElement("video");
//     video.src = "/videos/landing_video.mp4";
//     video.preload = "auto";
//     video.oncanplaythrough = () => setAssetsLoaded(true);
//   }, []);

//   // Trigger intro after loading
//   useEffect(() => {
//     if (progress === 100 && assetsLoaded) {
//       setTimeout(() => {
//         setShowIntro(true);
//       }, 500);
//     }
//   }, [progress, assetsLoaded]);

//   // Scroll/touch to start animation
//   useEffect(() => {
//     const start = () => {
//       if (showIntro) {
//         setShowIntro(false);
//         setTimeout(() => {
//           setAnimationStarted(true);
//           startTimeRef.current = Date.now();
//         }, 500);
//       }
//     };
//     window.addEventListener("wheel", start, { once: true });
//     window.addEventListener("touchstart", start, { once: true });
//     return () => {
//       window.removeEventListener("wheel", start);
//       window.removeEventListener("touchstart", start);
//     };
//   }, [showIntro]);

//   // Animation loop
//   useEffect(() => {
//     if (!animationStarted) return;
//     const animationDuration = 8000;
//     const animate = () => {
//       if (!startTimeRef.current) return;
//       const elapsed = Date.now() - startTimeRef.current;
//       const prog = Math.min(elapsed / animationDuration, 1);
//       setAnimationProgress(prog);
//       setLightIntensity(0.6 + prog * 1.2);

//       if (prog >= 0.3) {
//         const zp = (prog - 0.3) / 0.7;
//         if (zp <= 0.6) setFadeOpacity(zp / 0.6);
//         else if (zp <= 0.7) {
//           setFadeOpacity(1);
//           if (!showVideo) {
//             setShowVideo(true);
//             setTimeout(
//               () => videoRef.current?.play().catch(console.error),
//               100
//             );
//           }
//         } else setFadeOpacity(1 - (zp - 0.7) / 0.3);
//       }

//       if (prog < 1) animationRef.current = requestAnimationFrame(animate);
//     };
//     animationRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationRef.current || 0);
//   }, [animationStarted, showVideo]);

//   const introText =
//     progress < 100 || !assetsLoaded ? "Loading..." : "Enter the World of VR";
//   const subText =
//     progress < 100 || !assetsLoaded
//       ? `${Math.floor(progress)}%`
//       : isMobile
//       ? "Rotate your phone to landscape, and touch the screen!"
//       : "Scroll to begin your journey";

//   const icon =
//     progress < 100 || !assetsLoaded ? (
//       <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
//     ) : (
//       <svg
//         className="w-6 h-6 md:w-8 md:h-8 text-white mx-auto"
//         fill="none"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
//       </svg>
//     );

//   return (
//     <div className="relative w-full h-screen overflow-hidden bg-white">
//       {!showVideo && (
//         <Canvas
//           camera={{ position: [0, 0.3, 2.2], fov: isMobile ? 85 : 75 }}
//           className="absolute inset-0"
//           dpr={[1, 2]}
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

//       {showIntro && (
//         <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black z-20 transition-opacity duration-500 px-4">
//           <div className="absolute -rotate-45 -right-20 top-20 w-96 h-96 bg-[#24ffe9]/20 rounded-full blur-3xl"></div>
//           <div className="absolute rotate-12 -left-20 bottom-20 w-96 h-96 bg-[#00a8c9]/20 rounded-full blur-3xl"></div>
//           <div className="absolute rotate-45 left-40 top-20 w-64 h-64 bg-[#4f46e5]/15 rounded-full blur-3xl"></div>
//           <div className="absolute -rotate-12 right-40 bottom-20 w-80 h-80 bg-[#a855f7]/15 rounded-full blur-3xl"></div>

//           <div className="text-center z-10 max-w-4xl mx-auto">
//             <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">
//               {introText}
//             </h1>
//             <p className="text-lg md:text-xl text-white mb-8 md:mb-12 font-light">
//               {subText}
//             </p>
//             {icon}
//           </div>
//         </div>
//       )}

//       {showVideo && (
//         <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
//           <video
//             ref={videoRef}
//             src="/videos/landing_video.mp4"
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}

//       <div
//         className="absolute inset-0 bg-white pointer-events-none z-30"
//         style={{ opacity: fadeOpacity }}
//       />
//     </div>
//   );
// }

//v3.1 Loading Screen
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

// // Asset Loading Hook
// const useAssetLoader = () => {
//   const [loadingProgress, setLoadingProgress] = useState(0);
//   const [assetsLoaded, setAssetsLoaded] = useState(false);

//   useEffect(() => {
//     const loadAssets = async () => {
//       try {
//         // Track loading progress
//         let progress = 0;

//         // Load 3D model (simulate progress since useGLTF handles the actual loading)
//         const modelLoader = new Promise<void>((resolve) => {
//           // Simulate model loading progress
//           const simulateProgress = () => {
//             progress += 10;
//             setLoadingProgress(Math.min(progress, 50));

//             if (progress >= 50) {
//               resolve();
//             } else {
//               setTimeout(simulateProgress, 200);
//             }
//           };

//           setTimeout(simulateProgress, 100);
//         });

//         // Load video
//         const videoLoader = new Promise<HTMLVideoElement | null>((resolve) => {
//           const video = document.createElement("video");
//           video.src = "/videos/landing_video.mp4";
//           video.preload = "metadata";

//           const handleProgress = () => {
//             if (video.buffered.length > 0) {
//               const buffered = video.buffered.end(0);
//               const duration = video.duration || 1;
//               const videoProgress = (buffered / duration) * 50;
//               setLoadingProgress(Math.min(50 + videoProgress, 100));
//             }
//           };

//           const handleMetadataLoaded = () => {
//             progress = 75;
//             setLoadingProgress(progress);
//           };

//           const handleCanPlayThrough = () => {
//             progress = 100;
//             setLoadingProgress(100);
//             resolve(video);
//           };

//           const handleError = (event: ErrorEvent | Event) => {
//             console.error("Video loading error:", event);
//             progress = 100;
//             setLoadingProgress(100);
//             resolve(null);
//           };

//           video.addEventListener("loadedmetadata", handleMetadataLoaded);
//           video.addEventListener("canplaythrough", handleCanPlayThrough);
//           video.addEventListener("progress", handleProgress);
//           video.addEventListener("error", handleError);

//           // Fallback timeout
//           setTimeout(() => {
//             if (progress < 100) {
//               progress = 100;
//               setLoadingProgress(100);
//               resolve(null);
//             }
//           }, 10000); // 10 second timeout
//         });

//         await Promise.all([modelLoader, videoLoader]);

//         // Small delay to show 100% briefly
//         setTimeout(() => {
//           setAssetsLoaded(true);
//         }, 500);
//       } catch (error) {
//         console.error("Asset loading failed:", error);
//         setLoadingProgress(100);
//         setAssetsLoaded(true);
//       }
//     };

//     loadAssets();
//   }, []);

//   return { loadingProgress, assetsLoaded };
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
//   const { loadingProgress, assetsLoaded } = useAssetLoader();

//   // Handle scroll trigger for desktop and touch for mobile
//   useEffect(() => {
//     const handleInteraction = () => {
//       if (showIntro && assetsLoaded) {
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
//   }, [showIntro, assetsLoaded]);

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

//       {/* Loading/Intro Screen */}
//       {showIntro && (
//         <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black z-20 transition-opacity duration-500 px-4">
//           {/* Ambient glow effects */}
//           <div className="absolute -rotate-45 -right-20 top-20 w-96 h-96 bg-[#24ffe9]/20 rounded-full blur-3xl"></div>
//           <div className="absolute rotate-12 -left-20 bottom-20 w-96 h-96 bg-[#00a8c9]/20 rounded-full blur-3xl"></div>
//           <div className="absolute rotate-45 left-40 top-20 w-64 h-64 bg-[#4f46e5]/15 rounded-full blur-3xl"></div>
//           <div className="absolute -rotate-12 right-40 bottom-20 w-80 h-80 bg-[#a855f7]/15 rounded-full blur-3xl"></div>

//           <div className="text-center z-10 max-w-4xl mx-auto">
//             <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight transition-all duration-500">
//               {assetsLoaded ? "Enter the World of VR" : "Loading"}
//             </h1>
//             <p className="text-lg md:text-xl text-white mb-8 md:mb-12 font-light transition-all duration-500">
//               {assetsLoaded ? (
//                 <>
//                   <span className="hidden md:inline">
//                     Scroll to begin your journey
//                   </span>
//                   <span className="md:hidden">
//                     Rotate your phone to landscape, and touch the screen!
//                   </span>
//                 </>
//               ) : (
//                 `${Math.round(loadingProgress)}%`
//               )}
//             </p>
//             <div className="transition-all duration-500">
//               {assetsLoaded ? (
//                 <div className="animate-bounce">
//                   <svg
//                     className="w-6 h-6 md:w-8 md:h-8 text-white mx-auto"
//                     fill="none"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
//                   </svg>
//                 </div>
//               ) : (
//                 <div className="animate-spin">
//                   <svg
//                     className="w-6 h-6 md:w-8 md:h-8 text-white mx-auto"
//                     fill="none"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                   </svg>
//                 </div>
//               )}
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

//v4 - GitHub Release Host
"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const VIDEO_SRC =
  "https://github.com/0-Mark-Allen-0/Cogni-Client/releases/download/Asset/landing_video.mp4";

const MODEL_SRC =
  "https://github.com/0-Mark-Allen-0/Cogni-Client/releases/download/Asset/Quest3.glb";

/* ---------- Model ---------- */
const Model: React.FC = () => {
  const { scene } = useGLTF(MODEL_SRC);
  return <primitive object={scene} scale={1.5} />;
};

/* ---------- Camera path generation ---------- */
const createCameraPath = () => {
  const points: Array<{
    position: [number, number, number];
    lookAt: [number, number, number];
  }> = [];
  const totalFrames = 480;
  const radius = 2.2;
  const initialHeight = 0.3;
  const finalHeight = -0.02;

  for (let i = 0; i < totalFrames; i++) {
    const progress = i / (totalFrames - 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);

    const rotationProgress = Math.min(easeProgress / 0.5, 1);
    const angle = rotationProgress * Math.PI;

    const zoomStart = 0.3;
    const zoomProgress =
      easeProgress > zoomStart
        ? (easeProgress - zoomStart) / (1 - zoomStart)
        : 0;

    const currentRadius = radius * (1 - zoomProgress * 0.85);
    const y =
      initialHeight * (1 - easeProgress * 0.7) +
      finalHeight * (easeProgress * 0.7);

    let position: [number, number, number];
    let lookAt: [number, number, number];

    if (zoomProgress < 0.9) {
      position = [
        Math.sin(angle) * currentRadius,
        y,
        Math.cos(angle) * currentRadius,
      ];
      lookAt = [0, y * 0.5, 0];
    } else {
      const stableAngle = Math.PI;
      position = [
        Math.sin(stableAngle) * currentRadius,
        y,
        Math.cos(stableAngle) * currentRadius,
      ];
      lookAt = [0, y * 0.5, -0.1];
    }

    points.push({ position, lookAt });
  }

  return points;
};

/* ---------- Camera controller ---------- */
const CameraController = ({
  animationProgress,
}: {
  animationProgress: number;
}) => {
  const { camera } = useThree();
  const cameraPath = useRef(createCameraPath());

  useFrame(() => {
    const idx = Math.floor(animationProgress * (cameraPath.current.length - 1));
    const clamped = Math.min(idx, cameraPath.current.length - 1);
    const p = cameraPath.current[clamped];

    const targetPos = new THREE.Vector3(...p.position);
    const targetLook = new THREE.Vector3(...p.lookAt);

    camera.position.lerp(targetPos, 0.1);
    camera.lookAt(targetLook);
  });

  return null;
};

/* ---------- Mobile detection ---------- */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

/* ----------------- Main component ----------------- */
export default function VRHeadsetViewer() {
  const [showIntro, setShowIntro] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [zoomProgress, setZoomProgress] = useState(0);
  const [showVideo, setShowVideo] = useState(false); // sticky once true
  const [fadeOpacity, setFadeOpacity] = useState(0);
  const [lightIntensity, setLightIntensity] = useState(0.6);

  const [videoCanPlay, setVideoCanPlay] = useState(false);
  const [playFailed, setPlayFailed] = useState(false);

  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* Interaction trigger */
  useEffect(() => {
    const handleInteraction = () => {
      if (!showIntro) return;
      setShowIntro(false);
      setTimeout(() => {
        setAnimationStarted(true);
        startTimeRef.current = Date.now();
      }, 500);
    };
    window.addEventListener("wheel", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    return () => {
      window.removeEventListener("wheel", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [showIntro]);

  /* Animation loop (updates zoomProgress & fade) */
  useEffect(() => {
    if (!animationStarted) return;
    const animationDuration = 8000; // ms

    const step = () => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - (startTimeRef.current as number);
      const progress = Math.min(elapsed / animationDuration, 1);
      setAnimationProgress(progress);
      setLightIntensity(0.6 + progress * 1.2);

      if (progress >= 0.3) {
        const z = (progress - 0.3) / 0.7; // 0..1 over zoom phase
        setZoomProgress(z);

        if (z <= 0.6) {
          setFadeOpacity(z / 0.6);
        } else if (z <= 0.7) {
          setFadeOpacity(1);
        } else {
          setFadeOpacity(1 - (z - 0.7) / 0.3);
        }
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(step);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animationStarted]);

  /* Reveal video container once zoom threshold reached (order-resilient) */
  useEffect(() => {
    // debug:
    // console.log({ zoomProgress, showVideo, videoCanPlay });
    if (!showVideo && zoomProgress >= 0.6) {
      setShowVideo(true);
    }
  }, [zoomProgress, showVideo]);

  /* Attempt autoplay once we revealed video and the element reports canplay */
  useEffect(() => {
    if (showVideo && videoCanPlay && videoRef.current) {
      const p = videoRef.current.play();
      if (p && typeof p.then === "function") {
        p.catch((err) => {
          console.warn("Autoplay blocked or failed:", err);
          setPlayFailed(true);
        });
      }
    }
  }, [showVideo, videoCanPlay]);

  /* Preload video as early as possible once mounted (so GitHub-release/R2 request starts) */
  useEffect(() => {
    const el = videoRef.current;
    if (el) {
      try {
        // load() signals browser to start fetching (useful if preload behavior is conservative)
        el.load();
      } catch (e) {
        // ignore
      }
    }
  }, []);

  /* ---------- markup ---------- */
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* 3D Scene - hidden once showVideo true */}
      {!showVideo && (
        <Canvas
          camera={{ position: [0, 0.3, 2.2], fov: isMobile ? 85 : 75 }}
          className="absolute inset-0"
          dpr={[1, 2]}
          style={{ zIndex: 0 }}
        >
          <ambientLight intensity={lightIntensity * 0.4} />
          <directionalLight position={[5, 5, 5]} intensity={lightIntensity} />
          <pointLight
            position={[-3, 2, 3]}
            intensity={lightIntensity * 0.3}
            color="#4f46e5"
          />

          <Suspense fallback={null}>
            <Model />
          </Suspense>

          <CameraController animationProgress={animationProgress} />
        </Canvas>
      )}

      {/* Intro overlay */}
      {showIntro && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black z-40 px-4 transition-opacity">
          <div className="absolute -rotate-45 -right-20 top-20 w-96 h-96 bg-[#24ffe9]/20 rounded-full blur-3xl" />
          <div className="absolute rotate-12 -left-20 bottom-20 w-96 h-96 bg-[#00a8c9]/20 rounded-full blur-3xl" />
          <div className="absolute rotate-45 left-40 top-20 w-64 h-64 bg-[#4f46e5]/15 rounded-full blur-3xl" />
          <div className="absolute -rotate-12 right-40 bottom-20 w-80 h-80 bg-[#a855f7]/15 rounded-full blur-3xl" />

          <div className="text-center z-50 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">
              Enter the World of VR
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 md:mb-12 font-light">
              <span className="hidden md:inline">
                Scroll to begin your journey
              </span>
              <span className="md:hidden">
                Rotate your screen, and touch to begin your journey!
              </span>
            </p>
            <div className="animate-bounce text-white">↓</div>
          </div>
        </div>
      )}

      {/* Video element (always mounted, initially hidden). We set pointer-events only when visible. */}
      <div
        className="absolute inset-0 z-20"
        style={{
          pointerEvents: showVideo ? "auto" : "none",
          opacity: showVideo ? 1 : 0,
          transition: "opacity 300ms ease",
          background: "black",
        }}
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          className="w-full h-full object-cover"
          preload="auto"
          playsInline
          muted
          loop
          onCanPlay={() => {
            // the browser reports it can start playback
            setVideoCanPlay(true);
          }}
          onCanPlayThrough={() => {
            // even better signal for large files
            setVideoCanPlay(true);
          }}
          onError={(e) => {
            console.warn("Video failed to load", e);
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* Play button fallback if autoplay blocked */}
        {showVideo && playFailed && (
          <button
            onClick={() => {
              if (!videoRef.current) return;
              videoRef.current.muted = false; // optional: unmute on user click if desired
              videoRef.current
                .play()
                .catch((e) => console.warn("Play failed", e));
              setPlayFailed(false);
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 40,
              padding: "12px 18px",
              background: "rgba(0,0,0,0.6)",
              color: "white",
              borderRadius: 8,
            }}
          >
            Tap to play
          </button>
        )}
      </div>

      {/* White fade overlay (covers video until it fades out) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "white",
          opacity: fadeOpacity,
          zIndex: 30,
          transition: "opacity 150ms linear",
        }}
      />
    </div>
  );
}

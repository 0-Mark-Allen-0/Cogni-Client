//v4 - Firebase Asset Host
"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useProgress } from "@react-three/drei";
import { Loader2, ChevronDown } from "lucide-react";
import * as THREE from "three";

//Firebase Hosted
const VIDEO_SRC =
  "https://firebasestorage.googleapis.com/v0/b/cogniverse-website.firebasestorage.app/o/landing_video.mp4?alt=media&token=98fd4be7-8c75-4c07-beb9-4aae291da537";

const MODEL_SRC =
  "https://firebasestorage.googleapis.com/v0/b/cogniverse-website.firebasestorage.app/o/Quest3.glb?alt=media&token=2543407f-831d-4101-a3ec-58242dcc6504";

const Model: React.FC = () => {
  const { scene } = useGLTF(MODEL_SRC);
  return <primitive object={scene} scale={1.5} />;
};

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

  // Use drei's useProgress to track model loading progress
  const { active, progress } = useProgress();

  /* Interaction trigger */
  useEffect(() => {
    const handleInteraction = () => {
      if (!showIntro) return;
      // Only allow interaction after model is loaded
      if (active) return; // still loading, ignore interaction

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
  }, [showIntro, active]);

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

  /* Preload video as early as possible once mounted */
  useEffect(() => {
    const el = videoRef.current;
    if (el) {
      try {
        el.load();
      } catch (e) {}
    }
  }, []);

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

      {/* Intro / Loading overlay */}
      {showIntro && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black z-40 px-4 transition-opacity select-none">
          <div className="absolute -rotate-45 -right-20 top-20 w-96 h-96 bg-[#24ffe9]/20 rounded-full blur-3xl" />
          <div className="absolute rotate-12 -left-20 bottom-20 w-96 h-96 bg-[#00a8c9]/20 rounded-full blur-3xl" />
          <div className="absolute rotate-45 left-40 top-20 w-64 h-64 bg-[#4f46e5]/15 rounded-full blur-3xl" />
          <div className="absolute -rotate-12 right-40 bottom-20 w-80 h-80 bg-[#a855f7]/15 rounded-full blur-3xl" />

          <div className="text-center z-50 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">
              {active ? "Loading" : "Enter the World of VR"}
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 md:mb-12 font-light">
              {active ? (
                // Show loading progress percent while active
                <span>{Math.floor(progress)}%</span>
              ) : (
                <>
                  <span className="hidden md:inline">
                    Scroll to begin your journey
                  </span>
                  <span className="md:hidden">
                    Rotate your screen, and touch to begin your journey!
                  </span>
                </>
              )}
            </p>
            <div className="text-white">
              {active ? (
                <Loader2
                  className="mx-auto animate-spin"
                  size={48}
                  aria-label="Loading spinner"
                />
              ) : (
                <ChevronDown
                  className="mx-auto animate-bounce"
                  size={48}
                  aria-label="Scroll down arrow"
                />
              )}
            </div>
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
            setVideoCanPlay(true);
          }}
          onCanPlayThrough={() => {
            setVideoCanPlay(true);
          }}
          onError={(e) => {
            console.warn("Video failed to load", e);
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {showVideo && playFailed && (
          <button
            onClick={() => {
              if (!videoRef.current) return;
              videoRef.current.muted = false;
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

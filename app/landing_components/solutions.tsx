//v4
"use client";

import React from "react";
import { Bot, BarChart3, Clock3, ComputerIcon } from "lucide-react";

const FEATURES = [
  {
    title: "VR Surgical Training",
    description:
      "Step into immersive operating theatres, built to match medical protocols. Used by nurses, surgeons, and educators to practice decision-making and procedure flow.",
    imageSrc: "/VR training.png",
    bg: "bg-white",
    span: "md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-2",
  },
  {
    title: "HalaraXR",
    description:
      "Calm, interactive VR experiences that help identify and understand neurodivergent needs in children.",
    icon: ComputerIcon,
    image: "/hala-1.jpg",
    bg: "bg-white",
    span: "md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-3",
  },
  {
    title: "AI-Powered Learning in VR",
    description:
      "An in-VR conversational avatar supports trainees with prompts, cues, and guidance—helping reinforce every step of the process.",
    imageSrc: "/ai-assistant.png",
    bg: "bg-white",
    span: "md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-4",
  },
  {
    title: "Real-Time Monitoring & Feedback",
    description:
      "Actions and decisions tracked during training, providing feedback that helps learners improve and practitioners track growth.",
    imageSrc: "/Realtime monitoring.png",
    bg: "bg-white",
    span: "md:col-start-2 md:col-end-4 md:row-start-3 md:row-end-4",
  },
  {
    title: "What's Next",
    description:
      "We’re constantly developing new features to make our VR modules more realistic and impactful. Updates coming soon. Please come back here for more updates!",
    icon: Clock3,
    bg: "bg-white",
    span: "md:col-start-1 md:col-end-4 md:row-start-4 md:row-end-5",
  },
];

const Solutions = () => {
  return (
    <section className="bg-gradient-to-br from-[#07ECC6]/10 to-[#28A0E3]/10 text-gray-800 py-24 px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">What We Do</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Creating VR tools to empower medical teams for learning and growing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2.5fr_0.5fr_2fr] gap-6 max-w-7xl mx-auto">
        {FEATURES.map((feature, index) => {
          // Destructure the icon directly to use it conditionally
          const { icon: Icon } = feature;
          return (
            <div
              key={index}
              className={`${feature.bg} ${feature.span} text-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col`}
            >
              <div
                className={`flex-1 flex flex-col ${
                  feature.image ? "" : "justify-center"
                }`}
              >
                <div className="flex items-center mb-4">
                  {/* Conditional rendering for image or icon */}
                  {feature.imageSrc ? (
                    <img
                      src={feature.imageSrc}
                      alt={feature.title}
                      className="w-8 h-8 mr-2"
                    />
                  ) : (
                    // This check prevents the error
                    Icon && <Icon className="text-cyan-600 w-8 h-8 mr-2" />
                  )}
                  <h3 className="text-xl font-semibold text-cyan-600">
                    {feature.title}
                  </h3>
                </div>

                {feature.image && (
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-3/4 h-auto object-cover rounded-xl my-4 mx-auto"
                  />
                )}

                <p className="text-md text-gray-700 leading-relaxed mt-2">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Solutions;

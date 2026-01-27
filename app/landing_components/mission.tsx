//v2
import React from "react";
import {
  Users,
  BrainCircuit,
  Computer,
  Eye,
  Rocket,
  Zap,
  TrendingUp,
  Fullscreen,
  BrainCog,
  Earth,
} from "lucide-react";

const Mission = () => {
  const visionCards = [
    {
      title: "Raising Training Standards",
      description:
        "To create immersive, accurate, and effective learning experiences for practitioners.",
      icon: TrendingUp,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-500",
    },
    {
      title: "Expanding Access and Impact",
      description:
        "To make high-quality simulations available across regions and communities.",
      icon: Fullscreen,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-500",
    },
    {
      title: "Driving Innovation",
      description:
        "To continuously explore new ways AI and VR can enhance medical training.",
      icon: Zap,
      iconBg: "bg-fuchsia-100",
      iconColor: "text-fuchsia-500",
    },
  ];

  const missionCards = [
    {
      title: "Harnessing VR",
      description:
        "To use the power of virtual reality to give medical teams a practical and safe way to train.",
      icon: BrainCog,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-500",
    },
    {
      title: "Making Learning Accessible",
      description:
        "To design training that can be used anytime, anywhere, by professionals worldwide.",
      icon: Earth,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-500",
    },
    {
      title: "Advancing with AI",
      description:
        "To integrate AI into our tools to improve patient care and safely personalise learning.",
      icon: BrainCircuit,
      iconBg: "bg-rose-100",
      iconColor: "text-rose-500",
    },
  ];

  return (
    <div>
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-50 via-white to-white"></div>
        <div className="container mx-auto px-6 relative max-w-7xl">
          <div className="grid md:grid-cols-2 gap-32">
            {/* Our Vision Section */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-800 mb-6">
                  Our Vision
                </h2>
                {/* <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Our vision is to build a future where every medical
                  professional has access to the most advanced, realistic, and
                  effective training tools available. We aim to close the gap
                  between theoretical knowledge and practical expertise,
                  ensuring confidence and competence in every procedure.
                </p> */}
              </div>
              <div className="grid gap-8 auto-rows-fr">
                {/* Old class: flex flex-col gap-8  */}
                {visionCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div
                        className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center mb-6`}
                      >
                        <Icon className={`h-6 w-6 ${card.iconColor}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {card.title}
                      </h3>
                      <p className="text-gray-600">{card.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Our Mission Section */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-800 mb-6">
                  Our Mission
                </h2>
                {/* <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  At CogniVerse, we are committed to revolutionizing medical
                  education through cutting-edge Virtual Reality (VR)
                  technology. Our goal is to elevate the quality of medical
                  training, enhance surgical precision, and improve patient care
                  worldwide by creating immersive, high-fidelity VR simulations
                  tailored for healthcare professionals.
                </p> */}
              </div>
              <div className="grid gap-8 auto-rows-fr">
                {/* Old class: flex flex-col gap-8 */}
                {missionCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div
                        className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center mb-6`}
                      >
                        <Icon className={`h-6 w-6 ${card.iconColor}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {card.title}
                      </h3>
                      <p className="text-gray-600">{card.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;

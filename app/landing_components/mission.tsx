// import React from "react";
// import { Users, BrainCircuit, Computer } from "lucide-react";

// const Mission = () => {
//   return (
//     <div>
//       <section className="py-20 bg-white relative overflow-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-50 via-white to-white"></div>
//         <div className="container mx-auto px-6 relative">
//           <div className="max-w-3xl mx-auto text-center mb-16">
//             <h2 className="text-6xl font-bold text-gray-800 mb-6">
//               Our Mission
//             </h2>
//             <p className="text-lg text-gray-700">
//               At CogniVerse, we are committed to revolutionizing medical
//               education through cutting-edge Virtual Reality (VR) technology.
//               Our goal is to elevate the quality of medical training, enhance
//               surgical precision, and improve patient care worldwide by creating
//               immersive, high-fidelity VR simulations tailored for healthcare
//               professionals
//             </p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//               <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
//                 <Computer className="h-6 w-6 text-emerald-500" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Virtual Reality
//               </h3>
//               <p className="text-gray-600">
//                 To harness the power of Virtual Reality (VR) to redefine medical
//                 training.
//               </p>
//             </div>
//             <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//               <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
//                 <Users className="h-6 w-6 text-amber-500" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Accessibility
//               </h3>
//               <p className="text-gray-600">
//                 To make high-quality, hands-on learning accessible to healthcare
//                 professionals worldwide.
//               </p>
//             </div>
//             <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//               <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-6">
//                 <BrainCircuit className="h-6 w-6 text-rose-500" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 AI-Driven
//               </h3>
//               <p className="text-gray-600">
//                 To develop cutting-edge, AI-driven VR simulations that improve
//                 patient care and safety.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Mission;

//v2
import React from "react";
import { Users, BrainCircuit, Computer, Eye, Rocket, Zap } from "lucide-react";

const Mission = () => {
  const visionCards = [
    {
      title: "Visionary Training",
      description:
        "To be the global leader in VR medical education, setting new standards for immersive and effective healthcare training.",
      icon: Eye,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-500",
    },
    {
      title: "Global Impact",
      description:
        "To expand access to high-fidelity medical simulations, empowering professionals in every corner of the world.",
      icon: Rocket,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-500",
    },
    {
      title: "Innovation Hub",
      description:
        "To continuously innovate with AI and VR, creating intelligent, adaptive products that evolve with medical science.",
      icon: Zap,
      iconBg: "bg-fuchsia-100",
      iconColor: "text-fuchsia-500",
    },
  ];

  const missionCards = [
    {
      title: "Virtual Reality",
      description:
        "To harness the power of Virtual Reality (VR) to redefine medical training.",
      icon: Computer,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-500",
    },
    {
      title: "Accessibility",
      description:
        "To make high-quality, hands-on learning accessible to healthcare professionals worldwide.",
      icon: Users,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-500",
    },
    {
      title: "AI-Driven",
      description:
        "To develop cutting-edge, AI-driven VR simulations that improve patient care and safety.",
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
              <div className="flex flex-col gap-8">
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
              <div className="flex flex-col gap-8">
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

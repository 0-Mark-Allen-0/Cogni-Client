// "use client";

// export default function TeamPage() {
//     return (
//         <div className="bg-gray-50 text-gray-800">
//             {/* Hero Section */}
//             <section className="relative bg-purple-100 text-purple-800 pt-[150px] pb-20 ">
//                 <div className="max-w-7xl mx-auto px-6 text-center">
//                     <h1 className="text-4xl md:text-5xl font-bold">Founding Team</h1>
//                     <p className="mt-4 text-lg md:text-xl">
//                         Meet the innovators behind CogniVerse – a team of accomplished professionals redefining medical education through cutting-edge VR technology.
//                     </p>
//                 </div>
//             </section>

//             {/* Founding Team Section */}
//             <section className="py-16 bg-white">
//                 <div className="max-w-7xl mx-auto px-6">
//                     <h2 className="text-3xl font-bold text-purple-800 text-center">Our Board</h2>
//                     <p className="mt-4 text-lg text-gray-700 text-center">
//                         At CogniVerse, we are dedicated to transforming medical education through innovation, expertise, and collaboration.
//                     </p>

//                     {/* Team Members Grid */}
//                     <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
//                         {[
//                             {
//                                 name: "Raghul Senthilnathan",
//                                 title: "Chief Executive Officer",
//                                 description:
//                                     "A biotechnology entrepreneur and visionary leader, pioneering immersive technology in medical training.",
//                             },
//                             {
//                                 name: "Dr. Lakshmi Divya Alahari",
//                                 title: "Director of Clinical Development",
//                                 description:
//                                     "A global healthcare innovator redefining medical training with immersive VR simulations.",
//                             },
//                             {
//                                 name: "Adharsh Gajendran",
//                                 title: "Director of Technology",
//                                 description:
//                                     "A pioneer in XR development, leading advancements in VR-based medical training simulations.",
//                             },
//                             {
//                                 name: "Ranjith Kumar Velassamy",
//                                 title: "Director of Business Development",
//                                 description:
//                                     "A strategic leader bridging technological innovation and real-world healthcare implementation.",
//                             },
//                             {
//                                 name: "Anant R. Joshi",
//                                 title: "Director of Business Growth & Finance",
//                                 description:
//                                     "A seasoned industry expert driving financial growth and global expansion for CogniVerse.",
//                             },
//                         ].map((member, index) => (
//                             <div
//                                 key={index}
//                                 className="bg-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
//                             >
//                                 {/* Placeholder Image */}
//                                 <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
//                                     <span className="text-gray-500">Image Placeholder</span>
//                                 </div>
//                                 {/* Member Details */}
//                                 <h3 className="text-xl font-bold text-purple-800">{member.name}</h3>
//                                 <p className="text-sm font-semibold text-gray-600">{member.title}</p>
//                                 <p className="mt-2 text-gray-700">{member.description}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Call to Action Section */}
//             <section className="py-16 bg-purple-100 text-purple-800">
//                 <div className="max-w-7xl mx-auto px-6 text-center">
//                     <h2 className="text-3xl font-bold">Contact & Partnerships</h2>
//                     <p className="mt-4 text-lg">
//                         Looking to integrate VR training into your institution? Interested in partnerships, investment, or collaboration? Let’s connect.
//                     </p>
//                     <a
//                         href="/contact"
//                         className="inline-block mt-6 px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-semibold transition-colors"
//                     >
//                         Get in Touch
//                     </a>
//                 </div>
//             </section>
//         </div>
//     );
// }

//v2
"use client";

export default function TeamPage() {
  return (
    <div className="bg-gradient-to-br from-[#07ECC6]/10 to-[#28A0E3]/10 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gray-800 pt-[150px] pb-20 overflow-hidden">
        {/* Background Blur Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -rotate-45 -right-20 top-10 w-96 h-96 bg-[#24ffe9]/20 rounded-full blur-3xl"></div>
          <div className="absolute rotate-12 -left-20 bottom-10 w-96 h-96 bg-[#00a8c9]/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Founding Team
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Meet the innovators behind CogniVerse – a team of accomplished
            professionals redefining medical education through cutting-edge VR
            technology.
          </p>
        </div>
      </section>

      {/* Founding Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#00a8c9] text-center">
            Our Board
          </h2>
          <p className="mt-4 text-lg text-gray-700 text-center">
            At CogniVerse, we are dedicated to transforming medical education
            through innovation, expertise, and collaboration.
          </p>

          {/* Team Members Grid */}
          <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Raghul Senthilnathan",
                title: "Chief Executive Officer",
                description:
                  "A biotechnology entrepreneur and visionary leader, pioneering immersive technology in medical training.",
              },
              {
                name: "Dr. Lakshmi Divya Alahari",
                title: "Director of Clinical Development",
                description:
                  "A global healthcare innovator redefining medical training with immersive VR simulations.",
              },
              {
                name: "Adharsh Gajendran",
                title: "Director of Technology",
                description:
                  "A pioneer in XR development, leading advancements in VR-based medical training simulations.",
              },
              {
                name: "Ranjith Kumar Velassamy",
                title: "Director of Business Development",
                description:
                  "A strategic leader bridging technological innovation and real-world healthcare implementation.",
              },
              {
                name: "Anant R. Joshi",
                title: "Director of Business Growth & Finance",
                description:
                  "A seasoned industry expert driving financial growth and global expansion for CogniVerse.",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                {/* Placeholder Image */}
                <div className="w-full h-48 bg-gradient-to-br from-[#07ECC6]/20 to-[#28A0E3]/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-[#00a8c9] font-medium">
                    Image Placeholder
                  </span>
                </div>
                {/* Member Details */}
                <h3 className="text-xl font-bold text-[#00a8c9]">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-[#28A0E3]">
                  {member.title}
                </p>
                <p className="mt-2 text-gray-700">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-[#07ECC6]/20 to-[#28A0E3]/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#00a8c9]">
            Contact & Partnerships
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Looking to integrate VR training into your institution? Interested
            in partnerships, investment, or collaboration? Let us connect.
          </p>
          <a
            href="/contact"
            className="inline-block mt-6 px-8 py-3 bg-[#00a8c9] hover:bg-[#28A0E3] rounded-lg text-white font-semibold transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}

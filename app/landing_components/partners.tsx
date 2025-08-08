import React from "react";

const PARTNER_LOGOS = [
  {
    name: "University College London - Innovation & Enterprise",
    logo: "/ucl.png",
  },
  { name: "University College London Hospitals", logo: "/uclh.png" },
  //   { name: "Halara - Fun Learning For Everyone", logo: "/halara.png" },
];

const OurPartners = () => {
  return (
    <section className="bg-white py-12 px-8">
      <div className="text-center pb-12">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">Our Partners</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Built with and backed by leaders in healthcare
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 justify-center items-center max-w-6xl mx-auto">
        {PARTNER_LOGOS.map((partner, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-72 w-72 object-contain grayscale hover:grayscale-0 hover:scale-110 transition duration-200 ease-in-out"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPartners;

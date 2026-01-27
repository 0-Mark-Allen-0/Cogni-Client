"use client";
import ScrollVid from "./ScrollVid";
import Mission from "./landing_components/mission";
import OurValues from "./landing_components/values_v2";
import OurPartners from "./landing_components/partners";
import Solutions from "./landing_components/solutions";
import WhyChooseVr from "./landing_components/why_choose_vr";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section for Mobile & Tablets - COMMENTED OUT */}
      {/* <section className="block md:hidden relative bg-gray-800 py-24 pt-[150px]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -rotate-45 -right-20 top-20 w-96 h-96 bg-[#24ffe9]/20 rounded-full blur-3xl"></div>
          <div className="absolute rotate-12 -left-20 bottom-20 w-96 h-96 bg-[#00a8c9]/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-6">
              Transforming Ideas into Intelligent Solutions
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              At Cogniverse, we bridge the gap between human creativity and
              artificial intelligence, creating solutions that shape the future
              of technology.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-[#24ccff]/75 text-white rounded-lg transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section> */}

      {/* ScrollVid for All Devices */}
      <section>
        <ScrollVid />
      </section>

      {/* Solutions Section */}
      <Solutions />

      {/* Mission Section */}
      <Mission />

      <WhyChooseVr />

      {/* Values Section */}
      <OurValues />

      {/* Partners Section */}
      <OurPartners />

      {/* <AboutUs /> */}
    </main>
  );
}

"use client";

import React from "react";
import Header from "@/components/header";
export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - starts right below header */}
      <section className="relative bg-gradient-to-br from-[#28A0E3] to-[#07ECC6] text-white pt-24 pb-28 px-4 sm:px-6 lg:px-8 -mt-16">
        {/* Content container */}
        <div className="max-w-7xl mx-auto relative z-10 pt-16">
          <div className="max-w-3xl space-y-6">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              Healthcare Innovation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transforming <span className="text-[#FFEE58]">Healthcare</span>{" "}
              Education
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Where virtual reality meets medical expertise to create
              unparalleled training experiences.
            </p>
            <div className="flex gap-4 mt-8">
              <button className="px-6 py-3 bg-white text-[#28A0E3] rounded-lg font-medium hover:bg-gray-100 transition">
                Explore Solutions
              </button>
              <button className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-[#FFEE58]/20 blur-xl"></div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We work closely with frontline practitioners to recreate
                real-world medical environments in virtual space—combining
                cognitive science, procedural accuracy, and human-centered
                design.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Impact
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                From operating theatre protocols to sensory-friendly therapeutic
                worlds, every Cogniverse experience is designed to educate,
                engage, and empower. With a completed pilot at University
                College London Hospitals (UCLH), we are now scaling globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why VR Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#07ECC6]/10 to-[#28A0E3]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#28A0E3] text-white rounded-full text-sm font-medium mb-4">
              Why Choose VR?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Beyond Training.{" "}
              <span className="text-[#07ECC6]">Into Mastery.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionizing healthcare education through immersive technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#28A0E3]/10 rounded-lg flex items-center justify-center text-[#28A0E3] text-2xl mb-4">
                ⏱️
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Practice</h3>
              <p className="text-gray-600">
                Experience clinical scenarios with expected moments and critical
                situations.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#07ECC6]/10 rounded-lg flex items-center justify-center text-[#07ECC6] text-2xl mb-4">
                📊
              </div>
              <h3 className="text-xl font-semibold mb-3">Boost Confidence</h3>
              <p className="text-gray-600">
                Practice critical experiences repeatedly to build reporting
                confidence.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#28A0E3]/10 rounded-lg flex items-center justify-center text-[#28A0E3] text-2xl mb-4">
                🧠
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Pressure-free Learning
              </h3>
              <p className="text-gray-600">
                Learn at your own pace in a safe, pressure-free environment.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#07ECC6]/10 rounded-lg flex items-center justify-center text-[#07ECC6] text-2xl mb-4">
                🌍
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Access</h3>
              <p className="text-gray-600">
                Access training modules without geographical or time
                constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-[#07ECC6]/10 text-[#07ECC6] rounded-full text-sm font-medium mb-8">
            Success Stories
          </div>
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 leading-relaxed">
            This simulation made me feel more prepared for real surgery than any
            lecture or textbook. The level of detail is extraordinary
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-[#28A0E3] rounded-full flex items-center justify-center text-white font-bold">
              NE
            </div>
            <div>
              <p className="font-semibold text-gray-900">Nurse Educator</p>
              <p className="text-[#07ECC6]">UCLH Pilot Program</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#28A0E3]/10 to-[#07ECC6]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#07ECC6] text-white rounded-full text-sm font-medium mb-4">
              Our Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Immersive <span className="text-[#28A0E3]">Healthcare</span>{" "}
              Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed for real-world impact in clinical education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Solution 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group">
              <div className="bg-gradient-to-br from-[#28A0E3] to-[#28A0E3]/80 h-48 flex items-center justify-center relative overflow-hidden">
                <span className="text-white text-5xl font-bold z-10">VR</span>
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  VR Surgical Training
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience clinical scenarios with expected moments, critical
                  situations, and full operative procedures.
                </p>
                <button className="text-[#28A0E3] font-medium flex items-center gap-2 group-hover:underline">
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Solution 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group">
              <div className="bg-gradient-to-br from-[#07ECC6] to-[#07ECC6]/80 h-48 flex items-center justify-center relative overflow-hidden">
                <span className="text-white text-5xl font-bold z-10">XR</span>
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  HalaraXR - Therapy
                </h3>
                <p className="text-gray-600 mb-4">
                  Sensory-friendly therapeutic environments designed for
                  neurodivergent children.
                </p>
                <button className="text-[#07ECC6] font-medium flex items-center gap-2 group-hover:underline">
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Solution 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group">
              <div className="bg-gradient-to-br from-gray-800 to-gray-600 h-48 flex items-center justify-center relative overflow-hidden">
                <span className="text-white text-5xl font-bold z-10">AI</span>
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  AI-Powered Avatar
                </h3>
                <p className="text-gray-600 mb-4">
                  Interactive virtual assistant to guide learners and provide
                  real-time feedback.
                </p>
                <div className="flex items-center justify-between">
                  <button className="text-gray-800 font-medium flex items-center gap-2 group-hover:underline">
                    Coming Soon
                  </button>
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                    Beta
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

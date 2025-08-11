import React from "react";
import { Clock, BarChart2, Brain, Globe } from "lucide-react";

const WhyChooseVr = () => {
  return (
    <div>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-50 via-white to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose
              <span className="text-[#07ECC6]"> VR?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionizing healthcare education through immersive technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#28A0E3]/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="text-[#28A0E3] w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Practice</h3>
              <p className="text-gray-600">
                Step into realistic scenarios, from routine clinical procedures
                to critical situations.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#07ECC6]/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart2 className="text-[#07ECC6] w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Boost Confidence</h3>
              <p className="text-gray-600">
                Refine skills with repeated practice until they feel
                instinctive.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#28A0E3]/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="text-[#28A0E3] w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Pressure-free Learning
              </h3>
              <p className="text-gray-600">
                Progress at your own pace in a calm, risk-free setting.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-[#07ECC6]/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="text-[#07ECC6] w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Accessible Anywhere
              </h3>
              <p className="text-gray-600">
                Train anytime, without limits of place or schedule.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseVr;

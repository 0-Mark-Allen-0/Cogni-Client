"use client";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Google() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    // const formURL =
    //   "https://docs.google.com/forms/u/0/d/e/1FAIpQLSf0jKuHnU8vrtJ5JCtvr47rYvMCtf7zgcN3Xwcl0Ohi9g_5nw/formResponse";

    const formURL =
      "https://docs.google.com/forms/d/e/1FAIpQLSfqMhHaeDVPU_vnj4G0Bx-cC6nu6IH_cP1PMCm9Gt29jsUXLQ/formResponse";
    try {
      await fetch(formURL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      alert("Submitted Successfully! Redirect to Home Page ⬇");
      window.location.href = "/";
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative bg-gray-800 py-16 overflow-hidden">
        {/* Background Blur Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -rotate-45 -right-20 top-10 w-96 h-96 bg-[#24ffe9]/20 rounded-full blur-3xl"></div>
          <div className="absolute rotate-12 -left-20 bottom-10 w-96 h-96 bg-[#00a8c9]/20 rounded-full blur-3xl"></div>
        </div>

        {/* Contact Content */}
        <div className="container mx-auto px-6 relative z-10 pt-6">
          {/* <h1 className="text-4xl font-semibold text-white mb-4 pt-4">
            Contact Us
          </h1> */}
        </div>
      </section>

      <section className="py-16 max-w-7xl justify-center mx-auto">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-[#00a8c9] mb-6">
                  Send us a message
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      // name="entry.1296788053"
                      name="entry.299613777"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      // name="entry.891960373"
                      name="entry.1544945603"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      // name="entry.1752009515"
                      name="entry.1919561868"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#00a8c9]/75 hover:bg-[#00a8c9] text-white font-medium py-3 rounded-lg transition-colors"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-[#00a8c9] mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-[#28A0E3]/75 mt-1" />
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">Address</h3>
                      <p className="text-gray-600">
                        Cogniverse Limited , UCL BaseKX
                        <br />
                        103c Camley St, London N1C 4PF
                        <br />
                        United Kingdom
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-[#28A0E3]/75 mt-1" />
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">Phone</h3>
                      <p className="text-gray-600">+44 (0) 7436194150</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-[#28A0E3]/75 mt-1" />
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600">
                        founders@cogniversetech.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
                  <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.6390404362337!2d-0.1335149233780754!3d51.53818007182023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b1211143701%3A0xc62e9c6ac89784a1!2sUCL%20BaseKX!5e0!3m2!1sen!2sin!4v1747737532873!5m2!1sen!2sin"
                      className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

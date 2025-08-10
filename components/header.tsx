"use client";

import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 w-full z-50 px-4">
      <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-[#07ECC6]/75 via-[#24ccff]/75 to-[#28A0E3]/75 backdrop-blur-md shadow-lg rounded-2xl px-6 py-3">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="bg-white/50 rounded-md p-1">
              <img
                src="/cogni-logo.png" // <-- Replace with your actual image path
                alt="CogniVerse Logo"
                className="h-10 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-200 hover:text-white font-semibold"
            >
              Home
            </Link>

            {/* About Us Dropdown */}
            {/* <div
              className="relative"
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="flex items-center text-gray-200 hover:text-white font-semibold"
              >
                About Us
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    isAboutOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isAboutOpen && (
                <div
                  className="absolute top-full left-0 w-48 bg-gradient-to-br from-[#00a8c9]/75 via-[#24ccff]/75 to-[#24ffe9]/75 backdrop-blur-md rounded-xl shadow-lg py-2"
                  onMouseEnter={() => setIsAboutOpen(true)}
                  onMouseLeave={() => setIsAboutOpen(false)}
                >
                  <Link
                    href="/about_us/team"
                    className="block px-4 py-2 text-gray-200 hover:bg-[#00a8c9] hover:text-white font-semibold"
                  >
                    Team
                  </Link>
                  <Link
                    href="/about_us/technology"
                    className="block px-4 py-2 text-gray-200 hover:bg-[#00a8c9] hover:text-white font-semibold"
                  >
                    Technology
                  </Link>
                </div>
              )}
            </div> */}

            <Link
              href="/contact"
              className="text-gray-200 hover:text-white font-semibold"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 text-center rounded-xl p-4">
            <Link
              href="/"
              className="block text-gray-200 hover:text-white font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile About Us Dropdown */}
            {/* <div className="relative">
              <button
                className="flex items-center justify-center w-full text-gray-200 hover:text-white font-semibold"
                onClick={() => setIsAboutOpen(!isAboutOpen)}
              >
                About Us
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${
                    isAboutOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isAboutOpen && (
                <div className="mt-2 space-y-2 bg-[#00a8c9] rounded-md place-items-start px-4">
                  <Link
                    href="/about_us/team"
                    className="block py-2 text-gray-200 hover:text-white pl-4"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsAboutOpen(false);
                    }}
                  >
                    Team
                  </Link>
                  <Link
                    href="/about_us/technology"
                    className="block py-2 text-gray-200 hover:text-white pl-4"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsAboutOpen(false);
                    }}
                  >
                    Technology
                  </Link>
                </div>
              )}
            </div> */}

            <Link
              href="/contact"
              className="block text-gray-200 hover:text-white font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

import React, { useState } from "react";

function ContactUs() {
  const [isCareers, setCareers] = useState(true);
  const [isService, setService] = useState(false);
  // const [careerSecbool, setcareer] = useState(true);

  return (
    <div className="flex justify-center">
      <div
        className={`relative w-3/4  min-h-[480px] bg-white rounded-[30px] shadow-lg overflow-hidden flex transition-all duration-600 ease-in-out mt-40  justify-center ${
          isService ? "rounded-r-full" : ""
        }`}
      >
        {/* Connect for Services (Sign Up) Form */}
        <div
          className={`absolute top-0 left-0 w-1/2  bg-white flex flex-col items-center justify-center p-10 transition-transform duration-500 ease-in-out ${
            isCareers
              ? "translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          } z-10`}
        >
          <h1 className="text-2xl font-bold mb-4">Connect for Services</h1>
          <span className="text-sm mb-4">
            or use your email for registration
          </span>
          <input
            type="text"
            placeholder="Name"
            className="bg-gray-200 border-none rounded-lg p-3 mb-2 w-full outline-none"
          />
          <input
            type="email"
            placeholder="Company Email"
            className="bg-gray-200 border-none rounded-lg p-3 mb-2 w-full outline-none"
          />
          <input
            type="phone"
            placeholder="Telephone"
            className="bg-gray-200 border-none rounded-lg p-3 mb-2 w-full outline-none"
          />
          <input
            type="text"
            placeholder="Messages"
            className="bg-gray-200 border-none rounded-lg p-3 mb-2 w-full outline-none"
          />
          <button className="bg-purple-700 text-white px-10 py-2 rounded-lg font-semibold mt-4">
            Submit
          </button>
          <button
            onClick={() => {
              setCareers(true);
              setService(false);
            }}
            className="mt-4 bg-transparent border-2 border-purple-700 text-purple-700 px-10 py-2 rounded-lg font-semibold"
          >
            Connect for Careers
          </button>
        </div>

        {/* Connect for Careers (Sign In) Form */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full bg-white flex flex-col items-center justify-center p-10 transition-transform duration-500 ease-in-out ${
            isCareers
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          } z-10`}
        >
          <h1 className="text-2xl font-bold mb-4">Connect for Careers</h1>
          <span className="text-sm mb-4">or use your email for login</span>
          <input
            type="text"
            placeholder="Name"
            className="bg-gray-200 border-none rounded-lg p-3 mb-2 w-full outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-200 border-none rounded-lg p-3 mb-2 w-full outline-none"
          />
          <input
            type="text"
            placeholder="Country"
            className="bg-gray-200 border-none rounded-lg p-3 mb-2 w-full outline-none"
          />
          <input
            type="file"
            className="bg-gray-200 border-none rounded-lg p-3 mb-2 w-full outline-none"
          />
          <button className="bg-purple-700 text-white px-10 py-2 rounded-lg font-semibold mt-4">
            Submit
          </button>
          <button
            onClick={() => {
              setCareers(false);
              setService(true);
            }}
            className="mt-4 bg-transparent border-2 border-purple-700 text-purple-700 px-10 py-2 rounded-lg font-semibold"
          >
            Connect for Services
          </button>
        </div>

        {/* Decorative Panel */}
        {isCareers && (
          <div
            className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-blue-400 to-purple-700 transition-transform duration-500 ease-in-out ${
              isCareers ? "-translate-x-full" : "translate-x-0"
            } z-0 rounded-r-full flex flex-col items-center justify-center p-10 text-white`}
          >
            <div
              className={`${
                isCareers ? "opacity-0" : "opacity-100"
              } transition-opacity duration-500`}
            >
              <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
              <p className="mb-4">
                Enter your personal details to use all site features
              </p>
            </div>
            <div
              className={`${
                isCareers ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
            >
              <h1 className="text-2xl font-bold mb-4">Hello, Friend!</h1>
              <p className="mb-4">
                Register with your personal details to enjoy the features
              </p>
            </div>
          </div>
        )}
        {isService && (
          <div
            className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r rounded-r-full from-blue-400 to-purple-700 transition-transform duration-500 ease-in-out ${
              isCareers ? "-translate-x-full" : "translate-x-0"
            } z-0  flex flex-col items-center justify-center p-10 text-white`}
          >
            <div
              className={`${
                isCareers ? "opacity-0" : "opacity-100"
              } transition-opacity duration-500`}
            >
              <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
              <p className="mb-4">
                Enter your personal details to use all site features
              </p>
            </div>
            <div
              className={`${
                isCareers ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
            >
              <h1 className="text-2xl font-bold mb-4">Hello, Friend!</h1>
              <p className="mb-4">
                Register with your personal details to enjoy the features
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactUs;

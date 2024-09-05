import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import config from "../../lib/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactUs() {
  const [isCareers, setCareers] = useState(true);
  const [isService, setService] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  // Initialize useForm hook
  const { register, handleSubmit, reset } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      if (isService) {
        // Service Form Fields
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("message", data.message);

        if (data.fileUpload && data.fileUpload.length > 0) {
          formData.append("fileUpload", data.fileUpload[0]);
        }
      } else {
        // Careers Form Fields
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("country", data.country);

        if (data.fileUpload && data.fileUpload.length > 0) {
          formData.append("fileUpload", data.fileUpload[0]);
        }
      }

      const endpoint = isService
        ? "api/service-contact/"
        : "api/career-contact/";

      const response = await axios.post(
        `${config.API_URL}/${endpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("API Response:", response.data);
      toast.success("Form submitted successfully!"); // Show success toast
      reset();
      setUploadedFileName("");
    } catch (error) {
      // console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again."); // Show error toast
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
    } else {
      setUploadedFileName("");
    }
  };
  return (
    <div className="flex justify-center">
      <div
        className={`relative w-3/4 min-h-[480px] bg-white rounded-[30px] shadow-lg overflow-hidden flex transition-all duration-600 ease-in-out mt-40 justify-center ${
          isService ? "rounded-r-full" : ""
        }`}
      >
        {/* Connect for Services (Sign Up) Form */}
        <div
          className={`absolute top-0 left-0 w-1/2 bg-white flex flex-col items-center justify-center p-10 transition-transform duration-500 ease-in-out ${
            isCareers
              ? "translate-y-full opacity-0"
              : "translate-x-0 opacity-100"
          } z-10`}
        >
          <h1 className="text-2xl font-bold mb-4">Connect for Services</h1>
          <span className="text-sm mb-4">
            or use your email for registration
          </span>

          {/* Form Starts */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className="bg-gray-200 border-none rounded-lg p-3 mb-2 w-full outline-none"
            />
            <input
              {...register("email")}
              type="email"
              placeholder="Company Email"
              className="bg-gray-200 border-none rounded-lg p-3 mb-2 w-full outline-none"
            />
            <input
              {...register("phone")}
              type="phone"
              placeholder="Telephone"
              className="bg-gray-200 border-none rounded-lg p-3 mb-2 w-full outline-none"
            />
            <textarea
              {...register("message")}
              placeholder="Messages"
              className="w-full h-40 p-3 mb-2 bg-gray-200 rounded-lg outline-none resize-none overflow-y-auto"
            ></textarea>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-purple-700 text-white p-4 rounded-lg font-semibold  w-full text-xl"
              >
                Submit
              </button>
            </div>
          </form>
          {/* Form Ends */}

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
              : "translate-y-full opacity-0"
          } z-10`}
        >
          <h1 className="text-2xl font-bold mb-4">Connect for Careers</h1>
          <span className="text-sm mb-4">or use your email for login</span>

          {/* Form Starts */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className="bg-gray-200 border-none rounded-lg p-3 mb-2 w-full outline-none"
            />
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="bg-gray-200 border-none rounded-lg p-3 mb-2 w-full outline-none"
            />
            <input
              {...register("country")}
              type="text"
              placeholder="Country"
              className="bg-gray-200 border-none rounded-lg p-3 mb-2 w-full outline-none"
            />
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16V9a4 4 0 014-4h2a4 4 0 014 4v7m-5 4v-2a2 2 0 00-2-2h-1a2 2 0 00-2 2v2m8 0H7"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  {...register("fileUpload")}
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange} // Add onChange handler
                />
              </label>
            </div>

            {uploadedFileName && (
              <div className="mt-4 text-center text-gray-700">
                <p>
                  Uploaded File:{" "}
                  <span className="font-semibold">{uploadedFileName}</span>
                </p>
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-purple-700 text-white p-4 rounded-lg font-semibold  w-full text-xl"
              >
                Submit
              </button>
            </div>
          </form>
          {/* Form Ends */}

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
            } z-0 flex flex-col items-center justify-center p-10 text-white`}
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
        <ToastContainer />
      </div>
    </div>
  );
}

export default ContactUs;

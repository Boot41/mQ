import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import config from "../../lib/config";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

function ContactUs() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (!data.name || !data.email || !data.phone || !data.organization || !data.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("organization", data.organization);
      formData.append("message", data.message);

      await axios.post(
        `${config.API_BASE_URL}/api/service-contact/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Form submitted successfully!");
      reset();
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-[800px] bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-6xl w-full"
      >
        <div className="flex flex-col md:flex-row">
        <div className="relative w-1/2 md:w-1/2flex-grow">
    <img
      src="static/s3.png" // Replace with your image path
      alt="Contact Us"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-8">
  <h2 className="text-3xl font-bold mb-4 text-center">Contact Information</h2>
  <p className="text-xl mb-6 text-center">Have any questions?</p>
  <div className="space-y-2 text-center">
    <p>123 Main Street, City, Country</p>
    <p>contact@example.com</p>
    <p>+1 234 567 890</p>
  </div></div></div>


          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("phone")}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("organization")}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("message")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={4}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-orange-500 text-white font-bold py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default ContactUs;

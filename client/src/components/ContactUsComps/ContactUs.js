import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_BASE_URL } from "../../lib/config";
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

      const response = await axios.post(
        `${API_BASE_URL}/api/service-contact/`,
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
    <div className="bg-gray-100">
      {/* Hero Section with Background Image */}
      <div
        className="flex items-center justify-center h-[350px] bg-cover bg-center relative"
        style={{ backgroundImage: "url('/static/contactus.jpeg')" }} // Replace with your image path
      >
       <div
  className="bg-black items-center bg-opacity-50 px-4 py-8 rounded-lg max-w-4xl mx-auto text-center relative flex justify-center items-center"
  style={{ zIndex: 1 }}
>
<div className="px-4 py-6">
  <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
    We’d love to hear from you! <br />
    <span className="text-orange-500">Contact Us</span>
  </h1>
  <p className="text-base md:text-lg mb-6 text-white">
    Reach out with any inquiries, and we’ll get back to you as soon as possible.
  </p>
</div>

</div></div>

      {/* Contact Form Section */}
      <motion.div
        id="contact-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center p-6"
      >
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full p-8">
          <h2 className="text-5xl font-bold mb-6 text-gray-800 text-center">Get in Touch</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block text-xl text-gray-700 font-semibold mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xl text-gray-700 font-semibold mb-2">
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
                <label className="block text-xl text-gray-700 font-semibold mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("phone")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xl text-gray-700 font-semibold mb-2">
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
              <label className="block text-xl text-gray-700 font-semibold mb-2">
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
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default ContactUs;

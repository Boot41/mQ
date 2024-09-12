import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {API_BASE_URL}from "../../lib/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactUs() {
  const [uploadedFileName, setUploadedFileName] = useState("");
  // Initialize useForm hook
  const { register, handleSubmit, reset } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    if (!data.name || !data.email || !data.phone || !data.organization || !data.message) { // Updated to organization
      toast.error("Please fill in all fields."); // Show error toast if fields are empty
      return;
    }
    
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("organization", data.organization); // Updated to organization
      formData.append("message", data.message);

      const response = await axios.post(
        `${API_BASE_URL}/api/service-contact/`, // Adjust endpoint as needed
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

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
    // <div className>
    //   <div
    //     className={`relative w-3/4 min-h-[480px] bg-white rounded-[30px] shadow-lg overflow-hidden flex transition-all duration-600 ease-in-out mt-40 justify-center`}
    //   >

    //   </div>
    //     <ToastContainer />
    // </div>
    <div className="flex justify-center items-center h-[80vh]"> {/* Set a fixed height */}
      <div
        className={`bg-white flex flex-col items-center justify-center p-10 transition-transform duration-500 ease-in-out z-10`}
        style={{ margin: "auto" }} // Center the inner div
      >
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <div className="w-24 h-1 bg-orange-400 mx-auto mb-6"></div>

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
          <input
            {...register("organization")} // Changed from jobTitle to organization
            type="text"
            placeholder="Organization" // Updated placeholder
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
              className="bg-orange-400 text-white p-4 rounded-lg font-semibold  w-full text-xl"
            >
              Submit
            </button>
          </div>
        </form>
        {/* Form Ends */}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ContactUs;

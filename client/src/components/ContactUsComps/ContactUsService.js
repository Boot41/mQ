import React from "react";

function ContactUsService() {
  return (
    <div className="flex flex-col w-full h-full p-4 lg:p-10 items-center justify-center ">
      <div className="w-full max-w-lg">
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {/* Name Field */}
            <label className="flex flex-col">
              <p className="text-base font-medium pb-2">Name</p>
              <input
                placeholder="Your full name"
                className="form-input w-full resize-none rounded-xl border border-gray-300 bg-white h-14 placeholder-gray-400 p-3 text-base"
              />
            </label>

            {/* Email Field */}
            <label className="flex flex-col">
              <p className="text-base font-medium pb-2">Email</p>
              <input
                placeholder="Your email"
                className="form-input w-full resize-none rounded-xl border border-gray-300 bg-white h-14 placeholder-gray-400 p-3 text-base"
              />
            </label>

            {/* Phone Number Field */}
            <label className="flex flex-col">
              <p className="text-base font-medium pb-2">Phone number</p>
              <input
                placeholder="Your phone number"
                className="form-input w-full resize-none rounded-xl border border-gray-300 bg-white h-14 placeholder-gray-400 p-3 text-base"
              />
            </label>

            {/* Company Name Field */}
            <label className="flex flex-col">
              <p className="text-base font-medium pb-2">Company Name</p>
              <input
                placeholder="Your company name"
                className="form-input w-full resize-none rounded-xl border border-gray-300 bg-white h-14 placeholder-gray-400 p-3 text-base"
              />
            </label>

            {/* Service Required Field */}
            <label className="flex flex-col">
              <p className="text-base font-medium pb-2">Service Required</p>
              <input
                placeholder="Service you are interested in"
                className="form-input w-full resize-none rounded-xl border border-gray-300 bg-white h-14 placeholder-gray-400 p-3 text-base"
              />
            </label>

            {/* Details/Description Field */}
            <label className="flex flex-col">
              <p className="text-base font-medium pb-2">Details/Description</p>
              <textarea
                placeholder="Brief description of your requirements"
                className="form-input w-full resize-none rounded-xl border border-gray-300 bg-white h-32 placeholder-gray-400 p-3 text-base"
              />
            </label>
          </div>

          <div className="flex flex-col gap-4">
            {/* Checkbox Options */}
            <label className="flex items-start gap-x-3">
              <input type="checkbox" />
              <p>Does your company use Salesforce?</p>
            </label>
            <label className="flex items-start gap-x-3">
              <input type="checkbox" />
              <p>
                I wish to receive other information about Momentive like product
                updates, news, information, and special promotions.
              </p>
            </label>
          </div>

          <p className="text-sm text-gray-500 pb-3 pt-1 text-center">
            By clicking 'Request a demo', I agree to use of my details to
            contact me about my specific request or inquiry.
          </p>

          <div className="flex">
            <button
              type="submit"
              className="w-full h-12 px-5 rounded-full bg-orange-500 text-white text-base font-bold hover:bg-green-700 transition-all duration-200 ease-in-out"
            >
              Request a demo
            </button>
          </div>
        </form>

        <button className="text-sm text-gray-500 pb-3 pt-1 text-center underline w-full mt-4">
          Want to start a trial instead?
        </button>
      </div>
    </div>
  );
}

export default ContactUsService;

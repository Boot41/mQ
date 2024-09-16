import React from "react";
import { LuArrowUpFromLine } from "react-icons/lu";
import ItemsContainer from "./ItemsContainer"; // Component to contain footer menu items
import SocialIcons from "./SocialIcons"; // Component for social media icons (currently commented out)
import { Icons } from "./Menus"; // Importing icon data

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white w-full mt-20 pb-10">
      {/* Scroll to Top Button */}
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
          <div className="flex justify-end -mb-5 cursor-pointer p-2">
            <LuArrowUpFromLine
              size={32}
              color="orange"
              onClick={scrollToTop}
              className="border-2 border-orange-400 p-2 hover:bg-orange-500 hover:text-black rounded-full transition-colors duration-300"
            />
          </div>
        </div>
      </div>

      {/* Footer Menu Items */}
      <ItemsContainer />

      {/* Footer Bottom Section */}
      <div className="flex flex-col text-center px-4 sm:px-6 lg:px-8 mt-6">
        {/* Terms and Privacy Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
          <span className="text-sm md:text-base">© 2024 Appy. All rights reserved.</span>
          <span className="text-sm md:text-base">Terms · Privacy Policy</span>
        </div>
        
        {/* Social Icons Section (currently commented out) */}
        {/* <SocialIcons Icons={Icons} className="mt-4" /> */}
      </div>
    </footer>
  );
};

export default Footer;

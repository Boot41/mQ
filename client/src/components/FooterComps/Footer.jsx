import React from "react";
import { LuArrowUpFromLine } from "react-icons/lu";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menus";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white w-full mt-20 pb-10">
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
          <div className="flex justify-end -mb-5 cursor-pointer p-2">
            <LuArrowUpFromLine
              size={32}
              color="orange"
              onClick={scrollToTop}
              className="border-2 border-orange-400 p-2  hover:text-black transition-colors duration-300"
            />
          </div>
        </div>
      </div>

      <ItemsContainer />

      <div className="flex flex-col text-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2 mt-4">
          <span className="text-sm">© 2020 Appy. All rights reserved.</span>
          <span className="text-sm">Terms · Privacy Policy</span>
        </div>
        <SocialIcons Icons={Icons} className="mt-6" />
      </div>
    </footer>
  );
};

export default Footer;

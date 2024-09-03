import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menus";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-12 py-7">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-normal text-center  mb-6 md:mb-0 md:w-full">
          <span className="text-orange-400 ">It’s not the end..!</span>, the
          exploration just started again!
        </h1>
      </div>
      <ItemsContainer />
      <div className="flex flex-col  text-center">
        <div className="flex justify-center  mb-2 mt-2">
          <span className="mr-2 ">© 2020 Appy. All rights reserved.</span>
          <span>Terms · Privacy Policy</span>
        </div>
        <SocialIcons Icons={Icons} className="mb-4" />
      </div>
    </footer>
  );
};

export default Footer;

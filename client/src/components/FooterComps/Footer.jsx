import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";
import { Icons } from "./Menus";
import { FaAutoprefixer } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="bg-black text-white w-full mt-20 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-12 py-7">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-normal text-center  mb-6 md:mb-0 md:w-full">
          <span className="text-orange-400 ">It’s not the end..!</span>, the
          exploration just started again!
        </h1>
      </div>
      <div className="flex justify-center -mb-5 cursor-pointer p-2">
        <duv className="h-fit w-full max-w-[52vw] flex justify-end ">
          <FaAutoprefixer size={48} color="orange " onClick={scrollToTop} />
        </duv>
      </div>

      <ItemsContainer />
      <div className="flex flex-col  text-center">
        <div className="flex justify-center  mb-2 mt-4">
          <span className="mr-2 ">© 2020 Appy. All rights reserved.</span>
          <span>Terms · Privacy Policy</span>
        </div>
        <SocialIcons Icons={Icons} color="orange" className="mt-10" />
      </div>
    </footer>
  );
};

export default Footer;

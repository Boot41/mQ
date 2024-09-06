import Item from "./Item";
import { PRODUCTS, Services, COMPANY, Pages } from "./Menus";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { Link } from "react-router-dom";

const ItemsContainer = () => {
  return (
    <div className="flex justify-center">
      <div>
        {Pages.map((page) => (
          <Link
            key={page.name}
            to={`/${page.link}`}
            className="text-white p-1"
          ></Link>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-around items-start sm:px-4 md:px-12 py-10 bg-white/10 w-full max-w-[52vw]  gap-4 md:gap-8 border-orange-300">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <HiOutlineBuildingOffice2
              size={24}
              color="orange"
              className="mr-2 border-2 border-orange-400 p-1"
            />
            <h1 className="text-lg md:text-xl font-semibold text-orange-400">
              Office Address
            </h1>
          </div>
          <div className="mt-2">
            <h1 className="text-white p-1">2nd Floor, Obeya Gusto</h1>
            <h1 className="text-white p-1">367, 5th Main Rd, Sector 6</h1>
            <h1 className="text-white p-1">HSR Layout, Bengaluru</h1>
            <h1 className="text-white p-1">Karnataka 560102</h1>
          </div>
        </div>

        <Item Links={Pages} title="Pages" />
        <Item Links={Services} title="Services" />
        <Item Links={PRODUCTS} title="PRODUCTS" />
        <Item Links={COMPANY} title="COMPANY" />
      </div>
    </div>
  );
};

export default ItemsContainer;

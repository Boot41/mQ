import Item from "./Item";
import { PRODUCTS, RESOURCES, COMPANY, SUPPORT, Address } from "./Menus";

const ItemsContainer = () => {
  return (
    <div className="flex flex-wrap justify-around items-start px-4 sm:px-12 py-7 bg-white/10 ml-20 mr-20">
      <Item Links={Address} title="ADDRESS" />
      <Item Links={PRODUCTS} title="PRODUCTS" />
      <Item Links={RESOURCES} title="RESOURCES" />
      <Item Links={COMPANY} title="COMPANY" />
      <Item Links={SUPPORT} title="SUPPORT" />
    </div>
  );
};

export default ItemsContainer;

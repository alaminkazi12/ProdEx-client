import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "./components/ProductCard";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => {
      setProducts(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="my-10 max-w-[95%] mx-auto">
      {/* search box */}
      <div className="max-w-[25%] mx-auto my-4">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      {/* categorization */}
      <div>
        {/* select by brand */}
        <div>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Select By Brand
            </option>
            <option>NatureBond</option>
            <option>ProBlend</option>
            <option>UrbanStyle</option>
            <option>YogaMaster</option>
            <option>EcoLux</option>
            <option>UrbanRunner</option>
            <option>YogaMaster</option>
            <option>GreenSpace</option>
            <option>TravelMate</option>
          </select>
        </div>

        {/* select by category */}
        <div>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Select By Category
            </option>
            <option>Fitness</option>
            <option>Kitchen Appliances</option>
            <option>Home Decor</option>
            <option>Electronics</option>
            <option>Skincare</option>
            <option>Accessories</option>
            <option>Clothing</option>
            <option>Footwear</option>
          </select>
        </div>

        {/* select by price range */}
        <div>
          <div className="price-range">
            <input
              className="input input-bordered w-full max-w-xs"
              type="number"
              placeholder="Min Price"
              // value={minPrice}
              // onChange={(e) => handlePriceRangeChange(e, "min")}
            />
            <input
              className="input input-bordered w-full max-w-xs"
              type="number"
              placeholder="Max Price"
              // value={maxPrice}
              // onChange={(e) => handlePriceRangeChange(e, "max")}
            />
          </div>
        </div>
      </div>

      {/* show products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product}></ProductCard>
        ))}
      </div>
      {/* pagination */}

      <div className="flex items-center justify-center mt-10">
        <div className="join">
          <button className="join-item btn btn-square">
            <TbPlayerTrackPrevFilled />
          </button>
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="1"
            defaultChecked
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="2"
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="3"
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="4"
          />
          <button className="join-item btn btn-square">
            <TbPlayerTrackNextFilled />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

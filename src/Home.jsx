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

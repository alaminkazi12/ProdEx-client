import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortField, setSortField] = useState("product_creation_date");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchProducts();
  }, [
    page,
    searchQuery,
    category,
    brand,
    minPrice,
    maxPrice,
    sortField,
    sortOrder,
  ]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products", {
        params: {
          page,
          limit,
          search: searchQuery,
          category,
          brand,
          minPrice,
          maxPrice,
          sortField,
          sortOrder,
        },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to the first page on new search
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1); // Reset to the first page on category change
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1); // Reset to the first page on brand change
  };

  const handlePriceRangeChange = (e, type) => {
    if (type === "min") {
      setMinPrice(e.target.value);
    } else {
      setMaxPrice(e.target.value);
    }
    setPage(1); // Reset to the first page on price range change
  };

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
    setPage(1); // Reset to the first page on sort change
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="my-10 max-w-[95%] mx-auto">
      <div className="border-2 rounded-xl p-12 mb-6">
        {/* search box */}
        <div className="max-w-[25%] mx-auto mb-6">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="grow"
              placeholder="Search...."
            />
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
        <div className="flex items-center justify-between">
          {/* select by brand */}
          <div>
            <select
              value={brand}
              onChange={handleBrandChange}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="" disabled selected>
                Select By Brand
              </option>
              <option value="NatureBond">NatureBond</option>
              <option value="ProBlend">ProBlend</option>
              <option value="UrbanStyle">UrbanStyle</option>
              <option value="YogaMaster">YogaMaster</option>
              <option value="EcoLux">EcoLux</option>
              <option value="UrbanRunner">UrbanRunner</option>
              <option value="GreenSpace">GreenSpace</option>
              <option value="TravelMate">TravelMate</option>
            </select>
          </div>

          {/* select by category */}
          <div>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="" disabled selected>
                Select By Category
              </option>
              <option value="Fitness">Fitness</option>
              <option value="Kitchen Appliances">Kitchen Appliances</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Electronics">Electronics</option>
              <option value="Skincare">Skincare</option>
              <option value="Accessories">Accessories</option>
              <option value="Clothing">Clothing</option>
              <option value="Footwear">Footwear</option>
            </select>
          </div>

          {/* select by price range */}
          <div className="">
            <div className="price-range flex items-center gap-10">
              <input
                className="input input-bordered w-full max-w-xs"
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => handlePriceRangeChange(e, "min")}
              />
              <input
                className="input input-bordered w-full max-w-xs"
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => handlePriceRangeChange(e, "max")}
              />
            </div>
          </div>

          {/* sorting */}
          <div className="sort-options flex gap-10">
            <button
              className="btn btn-outline btn-primary"
              onClick={() => handleSortChange("price", "asc")}
            >
              Price: Low to High
            </button>
            <button
              className="btn btn-outline btn-primary"
              onClick={() => handleSortChange("price", "desc")}
            >
              Price: High to Low
            </button>
            <button
              className="btn btn-outline btn-primary"
              onClick={() => handleSortChange("product_creation_date", "desc")}
            >
              Date: Newest First
            </button>
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
          <button
            className="join-item btn btn-square"
            onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
          >
            <TbPlayerTrackPrevFilled />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <input
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`join-item btn btn-square ${
                page === i + 1 ? "btn-active" : ""
              }`}
              type="radio"
              name="options"
              aria-label={i + 1}
              checked={page === i + 1}
              readOnly
            />
          ))}

          <button
            className="join-item btn btn-square"
            onClick={() =>
              handlePageChange(page < totalPages ? page + 1 : totalPages)
            }
            disabled={page === totalPages}
          >
            <TbPlayerTrackNextFilled />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

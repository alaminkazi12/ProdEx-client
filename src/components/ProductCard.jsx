import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div>
      <div className="card bg-base-100 shadow-xl h-96">
        {" "}
        {/* Set a fixed height */}
        <figure className="flex-1">
          {" "}
          {/* Flex-1 to make image take up remaining space */}
          <img src={product.product_image} alt={product.product_name} />
        </figure>
        <div className="card-body flex-1">
          {" "}
          {/* Flex-1 to make content take up remaining space */}
          <h2 className="card-title">{product.product_name}</h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

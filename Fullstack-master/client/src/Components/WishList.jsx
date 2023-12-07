import React, { useEffect, useState } from "react";
import axios from "axios";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        axios.defaults.headers.common[
          "Authorization"
        ] = ` ${localStorage.getItem("token")}`;
        const response = await axios.get("http://localhost:8000/getWishlist");
        setWishlist(response.data);
        console.log("Wishlist data:", response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post("http://localhost:8000/addToCart", {
        productId,
      });

      console.log("Added to cart:", response.data);

      setWishlist((prevWishlist) =>
        prevWishlist.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ... (existing code)

  return (
    <div className="flex flex-wrap justify-center">
      {wishlist.map((product) => (
        <div
          key={product.product_id}
          className="w-72 h-96 bg-white shadow-md rounded-lg mx-4 mb-16"
        >
          <img
            className="object-cover rounded-tl-lg rounded-tr-lg h-64"
            src={product.product_img}
            alt="Product"
          />
          <div className="px-5 py-3 space-y-2 text-sm">
            <h3 className="text-sm">{product.product_name}</h3>
            <div
              className="text-[#C08261] overflow-hidden"
              style={{
                maxHeight: "3em",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              {/* {product.product_dis} */}
            </div>

            <p className="space-x-2">
              <span className="text-2xl font-semibold text-[#C08261]">
                ${product.price}
              </span>
            </p>
            <div className="flex justify-between items-center pt-3 pb-2">
              <button
                onClick={() => addToCart(product.id)}
                className="px-4 py-2 bg-[#C08261] hover:bg-[#E2C799] text-center text-sm text-white rounded duration-300"
              >
                Add to Cart
              </button>
              <button
                title="Add to Favorites"
                className="text-2xl text-gray-300 hover:text-red-500 duration-300"
              >
                &hearts;
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishList;
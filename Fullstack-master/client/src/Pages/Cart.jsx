// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import Counter from "../Components/Counter";
// // // import { Link } from "react-router-dom";

// // // const Cart = () => {
// // //   const [cartProduct, setCartProduct] = useState([]);
// // //   console.log("firstttttttttttttttttttttt", cartProduct);
// // //   const [total, setTotal] = useState([]);
// // //   console.log("22222222222222", total);

// // //   useEffect(() => {
// // //     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
// // //     setCartProduct(storedCart);
// // //     const handleQuantityChange = (productId, quantityChange) => {
// // //       setCartProduct((prevCart) => {
// // //         const updatedCart = prevCart.map((item) => {
// // //           if (item.id === productId) {
// // //             return { ...item, quantity: item.quantity + quantityChange };
// // //           }
// // //           return item;
// // //         });

// // //         // Send updated cart data to the backend
// // //         updateCartInDatabase(updatedCart);

// // //         return updatedCart;
// // //       });
// // //     };

// // //     const handleRemoveItem = (id) => {
// // //       const removedProduct = cartProduct.find((item) => item.id === id);
// // //       const updatedCart = cartProduct.filter((item) => item.id !== id);

// // //       // Send updated cart data to the backend
// // //       updateCartInDatabase(updatedCart);

// // //       setCartProduct(updatedCart);
// // //     };

// // //     const updateCartInDatabase = async (updatedCart) => {
// // //       // const token = localStorage.getItem('token');
// // //       // axios.defaults.headers.common['Authorization'] = token;
// // //       // const token = localStorage.getItem("token");
// // //       // console.log("Token:", token);

// // //       try {
// // //         // Extract product information from the cart for the API request
// // //         const cartProduct = updatedCart.map(({ id, quantity }) => ({
// // //           productId: id,
// // //           quantity,
// // //         }));
// // //         // Send the updated cart data to the backend API
// // //         axios.defaults.headers.common[
// // //           "Authorization"
// // //         ] = `${localStorage.getItem("token")}`;

// // //         await axios.post("http://localhost:8000/items", {
// // //           cartProduct,
// // //         });

// // //         console.log("Cart updated in the database");
// // //       } catch (error) {
// // //         console.error("Error updating cart in the database:", error);
// // //       }
// // //     };
// // //     const fetchData = async () => {
// // //       try {
// // //         const response = await axios.get("http://localhost:8000/getitems");
// // //         console.log("Cart Products:", storedCart);
// // //         console.log("Total:", response.data);
// // //         setTotal(response.data);
// // //       } catch (error) {
// // //         console.error("An error occurred during data fetch:", error);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []); // empty dependency array means this effect runs once when the component mounts

// // //   useEffect(() => {
// // //     // Update local storage whenever cartProduct changes
// // //     localStorage.setItem("cart", JSON.stringify(cartProduct));
// // //   }, [cartProduct]);

// // //   return (
// // //     <section className="h-full py-12 sm:py-16 lg:py-20">
// // //       <div className="mx-auto px-4 sm:px-6 lg:px-8">
// // //         <div className="flex items-center justify-center">
// // //           <h1 className="text-2xl font-semibold text-[#17403C]">Your Cart</h1>
// // //         </div>

// // //         {total.length > 0 ? (
// // //           <div className="mx-auto mt-8 max-w-2xl md:mt-12">
// // //             <div className="bg-gray-50 shadow">
// // //               <div className="px-4 py-6 sm:px-8 sm:py-10">
// // //                 <div className="flow-root">
// // //                   <ul className="-my-8">
// // //                     {total.map((product) => (
// // //                       <li
// // //                         className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
// // //                         key={product.product_id}
// // //                       >
// // //                         {/* ... (remaining code) ... */}
// // //                       </li>
// // //                     ))}
// // //                   </ul>
// // //                 </div>

// // //                 <div className="mt-6 text-center">
// // //                   <Link to="/payment">
// // //                     <button
// // //                       type="button"
// // //                       className="group inline-flex w-full items-center justify-center rounded-md bg-[#17403C] px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#C3CAC3]"
// // //                     >
// // //                       Checkout
// // //                       <svg
// // //                         xmlns="http://www.w3.org/2000/svg"
// // //                         className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
// // //                         fill="none"
// // //                         viewBox="0 0 24 24"
// // //                         stroke="currentColor"
// // //                       >
// // //                         <path
// // //                           strokeLinecap="round"
// // //                           strokeLinejoin="round"
// // //                           strokeWidth={2}
// // //                           d="M13 7l5 5m0 0l-5 5m5-5H6"
// // //                         />
// // //                       </svg>
// // //                     </button>
// // //                   </Link>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <p>Your cart is empty.</p>
// // //         )}
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default Cart;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import Counter from "../Components/Counter";
// // import { Link } from "react-router-dom";
// // import Payment from "./Payment";
// // import { useOrder } from "../OrderContext/OrderContext";
// // import Footer from "../Components/Footer";
// // import Nav from "../Components/Nav";

// // const Cart = () => {
// //   const [cartProduct, setCartProduct] = useState([]);
// //   console.log("firstttttttttttttttttttttt", cartProduct);
// //   const [total, setTotal] = useState([]);
// //   console.log("22222222222222", total);
// //   const { cartData, setOrderData } = useOrder();

// //   useEffect(() => {
// //     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
// //     setCartProduct(storedCart);

// //     const fetchData = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         console.log("Token:", token);

// //         axios.defaults.headers.common[
// //           "Authorization"
// //         ] = ` ${localStorage.getItem("token")}`;

// //         const response = await axios.get("http://localhost:8000/getitems");
// //         console.log("Cart Products:", storedCart);
// //         console.log("Total:", response.data);
// //         setTotal(response.data);
// //       } catch (error) {
// //         console.error("An error occurred during data fetch:", error);
// //       }
// //     };

// //     fetchData();
// //   }, []); // empty dependency array means this effect runs once when the component mounts

// //   useEffect(() => {
// //     // Update local storage whenever cartProduct changes
// //     localStorage.setItem("cart", JSON.stringify(cartProduct));
// //   }, [cartProduct]);

// //   const handleQuantityChange = (productId, quantityChange) => {
// //     setCartProduct((prevCart) => {
// //       const updatedCart = prevCart.map((item) => {
// //         if (item.id === productId) {
// //           return { ...item, quantity: item.quantity + quantityChange };
// //         }
// //         return item;
// //       });

// //       // Send updated cart data to the backend
// //       // updateCartInDatabase(updatedCart);

// //       return updatedCart;
// //     });
// //   };

// //   // const handleRemoveItem = (id) => {
// //   //   const removedProduct = cartProduct.find((item) => item.id === id);
// //   //   const updatedCart = cartProduct.filter((item) => item.id !== id);

// //   //   // Send updated cart data to the backend
// //   //   updateCartInDatabase(updatedCart);

// //   //   setCartProduct(updatedCart);
// //   // };

// //   // const updateCartInDatabase = async (updatedCart) => {
// //   //   try {
// //   //     const token = localStorage.getItem("token");
// //   //     console.log("Token:", token);

// //   //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// //   //     // Extract product information from the cart for the API request
// //   //     const cartProduct = updatedCart.map(({ id, quantity }) => ({
// //   //       productId: id,
// //   //       quantity,
// //   //     }));
// //   //     // Send the updated cart data to the backend API
// //   //     await axios.post("http://localhost:8000/items", {
// //   //       cartProduct,
// //   //     });

// //   //     console.log("Cart updated in the database");
// //   //   } catch (error) {
// //   //     console.error("Error updating cart in the database:", error);
// //   //   }
// //   // };

// //   // usecontext
// //   const handleCheckout = () => {
// //     // يمكنك تحديث حالة الطلب هنا
// //     setOrderData(total);
// //   };

// //   return (
// //     <>
// //     <Nav />
// //     <section className="h-full py-12 sm:py-16 lg:py-20">
// //       <div className="mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center justify-center">
// //           <h1 className="text-2xl font-semibold text-[#17403C]">Your Cart</h1>
// //         </div>

// //         {total.length > 0 ? (
// //           <div className="mx-auto mt-8 max-w-2xl md:mt-12">
// //             <div className="bg-gray-50 shadow">
// //               <div className="px-4 py-6 sm:px-8 sm:py-10">
// //                 <div className="flow-root">
// //                   <ul className="-my-8">
// //                     {total.map((product) => (
// //                       <li
// //                         className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
// //                         key={product.product_id}
// //                       >
// //                         {/* ... (remaining code) ... */}
// //                         <img src={product.product_img} alt="" />
// //                         <h1 className="issa">{product.price}</h1>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>

// //                 <div className="mt-6 text-center">
// //                   <Link to="/payment">
// //                     <button
// //                       type="button"
// //                       onClick={handleCheckout}
// //                       className="group inline-flex w-full items-center justify-center rounded-md bg-[#C08261]  px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-[#C3CAC3]"
// //                     >
// //                       Checkout
// //                       <svg
// //                         xmlns="http://www.w3.org/2000/svg"
// //                         className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
// //                         fill="none"
// //                         viewBox="0 0 24 24"
// //                         stroke="currentColor"
// //                       >
// //                         <path
// //                           strokeLinecap="round"
// //                           strokeLinejoin="round"
// //                           strokeWidth={2}
// //                           d="M13 7l5 5m0 0l-5 5m5-5H6"
// //                         />
// //                       </svg>
// //                     </button>
// //                   </Link>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         ) : (
// //           <p>Your cart is empty.</p>
// //         )}
// //       </div>
// //     </section>
// //     <Footer />
// //     </>
// //   );
// // };

// // export default Cart;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Footer from "../Components/Footer";
// import Nav from "../Components/Nav";
// import { useOrder } from "../OrderContext/OrderContext";
// import Counter from "../Components/Counter";

// const Cart = () => {
//   const [cartProduct, setCartProduct] = useState([]);
//   const [total, setTotal] = useState([]);
//   console.log(total, "oooo");
//   const { cartData, setOrderData } = useOrder();
//   console.log("objectc", cartData);

//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       axios.defaults.headers.common["Authorization"] = ` ${localStorage.getItem(
//         "token",
//         token
//       )}`;
//       const response = await axios.get("http://localhost:8000/getitems");
//       setTotal(response.data);
//     } catch (error) {
//       console.error("An error occurred during data fetch:", error);
//     }
//   };

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartProduct(storedCart);

//     fetchData();
//     // const issa = fetchData()
//   }, []);

//   // useEffect(() => {
//   //   // localStorage.setItem("cart", JSON.stringify(cartProduct));
//   // }, [cartProduct]);

//   // const handleQuantityChange = (productId, quantityChange) => {
//   //   setCartProduct((prevCart) => {
//   //     const updatedCart = prevCart.map((item) => {
//   //       if (item.id === productId) {
//   //         const newQuantity = Math.max(0, item.quantity + quantityChange);
//   //         return { ...item, quantity: newQuantity };
//   //       }
//   //       return item;
//   //     });

//   //     return updatedCart;
//   //   });
//   // };

//   const handleCheckout = () => {
//     setOrderData(total);
//   };

//   return (
//     <>
//       <Nav />
//       <section className="flex items-center bg-stone-200 lg:h-full font-poppins dark:bg-gray-700">
//         <div className="justify-center flex-1 px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
//           <div className="p-8 bg-gray-50 dark:bg-gray-800">
//             <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">
//               Your Cart
//             </h2>
//             <div className="flex flex-wrap -mx-4">
//               {total.map((product) => (
//                 <div
//                   className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
//                   key={product.product_id}
//                 >
//                   <img
//                     src={product.product_img}
//                     alt=""
//                     className="w-full h-96 md:h-24 md:w-24 object-cover"
//                   />
//                   <div className="w-2/3 px-4">
//                     <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
//                       {product.product_name}
//                     </h2>
//                     {/* <p className="text-gray-500 dark:text-gray-400 ">{product.product_description}</p> */}
//                   </div>
//                   <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
//                     <div className="inline-flex items-center px-4 font-semibold ">
//                       <Counter
//                         cart_id={product.cart_id}
//                         fetchData={fetchData}
//                       />
//                     </div>
//                   </div>
//                   <div className="w-auto flex justify-end px-4 text-right md:w-1/6 lg:w-2/12 ">
//                     <p className="text-lg font-bold dark:text-gray-400">
//                       price: {product.price * product.quantity}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-6 text-center">
//               <Link to="/payment">
//                 <button
//                   type="button"
//                   onClick={handleCheckout}
//                   className="group inline-flex w-full items-center justify-center rounded-md bg-[#C08261]  px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow "
//                 >
//                   Checkout
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M13 7l5 5m0 0l-5 5m5-5H6"
//                     />
//                   </svg>
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import { useOrder } from "../OrderContext/OrderContext";
import Counter from "../Components/Counter";

const Cart = () => {
  const navigate = useNavigate();
  const [cartProduct, setCartProduct] = useState([]);
  const [total, setTotal] = useState([]);
  const { cartData, setOrderData } = useOrder();
 
 
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common[
        "Authorization"
      ] = ` ${localStorage.getItem("token", token)}`;
      const response = await axios.get("http://localhost:8000/getitems");
      setTotal(response.data);
    } catch (error) {
      console.error("An error occurred during data fetch:", error);
    }
  };



  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartProduct(storedCart);

   

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProduct));
  }, [cartProduct]);

  const handleQuantityChange = (productId, quantityChange) => {
    setCartProduct((prevCart) => {
      // Check if the product is already in the cart
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === productId
      );
  
      if (existingProductIndex !== -1) {
        // If the product is already in the cart, update the quantity
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantityChange;
  
        return updatedCart;
      } else {
        // If the product is not in the cart, add it
        const newProduct = {
          id: productId,
          quantity: Math.max(0, quantityChange), // Ensure quantity is not negative
          // ...other product details
        };
  
        return [...prevCart, newProduct];
      }
    });
  };
  const clearCart = () => {
    setCartProduct([]);
    localStorage.removeItem("cart");
  };

  const handleCheckout = () => {
    setOrderData(total);
    clearCart();
    navigate("/payment");
  };

  return (
    <>
      <Nav />
      <section className="flex items-center bg-stone-200 lg:h-full font-poppins dark:bg-gray-700">
        <div className="justify-center flex-1 px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
          <div className="p-8 bg-gray-50 dark:bg-gray-800">
            <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">
              Your Cart
            </h2>
            <div className="flex flex-wrap px-5 w-full">
              {total.map((product) => (
                <div
                  className="flex flex-col justify-between w-full space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                  key={product.product_id}
                >
                  <img
                    src={product.product_img}
                    alt=""
                    className="w-full h-96 md:h-24 md:w-24 object-cover"
                  />
                  <div className="w-2/3 px-4">
                    <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                      {product.product_name}
                    </h2>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                      <div className="inline-flex items-center px-4 font-semibold ">
                        <Counter
                          cart_id={product.cart_id}
                          quantity={product.quantity}
                          fetchData={fetchData}
                          onQuantityChange={(quantityChange) =>
                            handleQuantityChange(product.id, quantityChange)
                            
                          }
                        />
                      </div>
                    </div>
                    <div className="flex px-4 text-right w-1/2">
                      <p className="text-lg text-end w-full font-bold dark:text-gray-400">
                        price: {product.price * product.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link to="/payment">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="group inline-flex w-full items-center justify-center rounded-md bg-[#C08261]  px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow "
                >
                  Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;

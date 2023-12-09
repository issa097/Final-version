const payment = require("../models/payment");
const stripe = require("stripe")(
  "sk_test_51O8NuQEIz9ME8FdttGncSSbHQjTnx1WQRQOgD4n4T2FhfmVIZAMJ54QDgphJ7CjCAoIJ15hrWt6HwLsrRINYk1Eg008qZhBwrn"
); // Replace with your actual Stripe secret key

// const couponModel = require("../models/Coupon");
// const { calculateDiscountedTotal } = require("../models/Coupon");

const newpayment = async (req, res) => {
  // console.log(req.body);
  const user_id = req.user;
  try {
    const {
      cardholder,
      country,
      state,
      address,
      email,
      paymentMethodId,
      phone,
      amount,
      // product_name,

      cart,

      // product_id,
    } = req.body;
    // const issa = cart;
    console.log(cart);
    // console.log(product_name);
    const product_id = cart.map((item) => {
      return item.product_id;
    });
    // const product_name = cart.map((item) => {
    //   return item.product_id;
    // });
    console.log(product_id);

    // console.log(typeof amount);
    // const payment_img = req?.file?.path ? req.file.path : "majdi";
    // console.log(payment_img);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount),
        currency: "USD",
        payment_method_types: ["card"], // Add the appropriate payment method types
        payment_method: paymentMethodId,
        confirm: true,
        description: "Done",

        return_url: "https://your-website.com/success", // Specify the return URL
      });

      try {
        const newpayment = await payment.newpayment(
          user_id,
          cardholder,
          country,
          state,
          address,
          email,
          paymentMethodId,
          phone,
          amount,
          product_id
        );

        return res.status(200).json(newpayment.rows);
      } catch (error) {
        console.log(error);
        return res.status(500).json("internal server error");
      }

      // res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    // return res.status(500).json("internal server error");
  }
};

const getpayments = async (req, res) => {
  try {
    const result = await payment.getAllpayments();
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const getpaymentidUser = async (req, res) => {
  const user_id = req.params.userid;
  console.log(user_id);
  try {
    const result = await payment.getpaymentidUser(user_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const getpaymentid = async (req, res) => {
  const payment_id = req.params.payment_id;
  console.log(payment_id);
  try {
    const result = await payment.getpaymentid(payment_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const deletepayment = async (req, res) => {
  const payment_id = req.params.payment_id;
  try {
    const result = await payment.deletepayment(payment_id);
    console.log(payment_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

// const applyCoupon = async (req, res) => {
//   try {
//     const { code } = req.body;
//     console.log("dd", code);
//     const cart = req.body.cart;
//     // Assume that 'issa' is a valid array of items (cart)
//     const coupon = await couponModel.getCouponByCode(code);

//     if (!coupon) {
//       return res.status(400).json({ error: "Invalid coupon code" });
//     }

//     // Calculate discounted total and send it to the frontend
//     const discountedTotal = calculateDiscountedTotal(
//       coupon.discount_percentage,
//       cart
//     );
//     return res.status(200).json({ coupon, discountedTotal });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

module.exports = {
  newpayment,
  getpayments,
  getpaymentidUser,
  getpaymentid,
  deletepayment,
  // applyCoupon,
};

// cros
// cors_id  , cors_name ,cors_dis , cors_trinner , cors_location , date , hour

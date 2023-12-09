const db = require("../lib/db");

function createCoupon(code, discountPercentage) {
  const queryText =
    "INSERT INTO coupons (code, discount_percentage) VALUES ($1, $2) RETURNING *";
  const result = [code, discountPercentage];
  try {
    return db.query(queryText, result);
  } catch (error) {
    throw error;
  }
}

function getCouponByCode(code) {
  const queryText = "SELECT * FROM coupons WHERE code = $1";
  const result = [code];

  try {
    return db.query(queryText, result);
  } catch (error) {
    throw error;
  }
}
function getCouponByid(id) {
  const queryText = "SELECT * FROM coupons WHERE id = $1";
  const result = [id];

  try {
    return db.query(queryText, result);
  } catch (error) {
    throw error;
  }
}

const deleteCoupon = async (id) => {
  const queryText =
    "UPDATE coupons SET is_deleted = true WHERE id = $1 AND is_deleted = false RETURNING *";
  const result = [id];

  try {
    return db.query(queryText, result);
  } catch (error) {
    throw error;
  }
};
const calculateDiscountedTotal = (discountPercentage, cart) => {
  const originalTotal = cart.reduce((acc, item) => acc + item.amount, 0);
  const discountAmount = (originalTotal * discountPercentage) / 100;
  const discountedTotal = originalTotal - discountAmount;
  return discountedTotal;
};

module.exports = {
  createCoupon,
  getCouponByCode,
  deleteCoupon,
  calculateDiscountedTotal,
  getCouponByid,
};

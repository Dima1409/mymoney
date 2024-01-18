const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[^_.-]\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordPattern = /(?!\s)^[^ ]{7,14}$/;
const namePattern = /^[a-zA-zа-яіїєА-ЯІЇЄ ,.'-]{2,12}[^\_]*$/;
const commentPattern = /^[\p{L}]{3,14}$/u;
const amountPattern = /^\d+(\.\d{1,2})?$/;
const walletPattern = /^[\p{L} ]{2,12}$/u;
const categoryPattern = /^[\p{L} ]{2,12}$/u;

module.exports = {
  emailPattern,
  passwordPattern,
  namePattern,
  commentPattern,
  amountPattern,
  walletPattern,
  categoryPattern,
};

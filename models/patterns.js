const emailPattern =
  /^([a-zA-Z0-9]{1}[a-zA-Z0-9_\-.]{1,22})@([a-zA-Z0-9_\-.]{1,10})\.([a-zA-Z]{2,4})$/;
const passwordPattern = /(?!\s)^[^ ]{6,14}$/;
const namePattern =
  /^[a-zA-Zа-яА-ЯіїєІЇЄёЁ]{2,10}( [a-zA-Zа-яА-ЯіїєІЇЄёЁ]{2,12})?$/;
const commentPattern = /^[\p{L}]{3,14}$/u;
const amountPattern = /^(0\.([1-9]\d?|0[1-9])|[1-9]\d*(\.\d{1,2})?)$/;
const walletPattern = /^[\p{L} ]{2,12}$/u;
const walletTotalPattern = /^(0(\.\d{1,2})?|[1-9]\d*(\.\d{1,2})?)$/;
const categoryPattern = /^[\p{L} ]{2,12}$/u;

module.exports = {
  emailPattern,
  passwordPattern,
  namePattern,
  commentPattern,
  amountPattern,
  walletPattern,
  walletTotalPattern,
  categoryPattern,
};

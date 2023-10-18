function getIsIntegers (items) {
  for (let i = 0; i < items.length; i++) {
    if (typeof(items[i]) !== "number") {
      return false;
    }
  }
  return true;
}

module.exports = {
  getIsIntegers,
};

function getIsInputEmpty () {
  const items = Object.values(arguments);
  for (let i = 0; i < items.length; i++) {
    if (items[i] === undefined) {
      return true;
    }
  }
  return false;
}

module.exports = {
  getIsInputEmpty,
};

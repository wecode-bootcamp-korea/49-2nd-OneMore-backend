function getIsPremiumContent (items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].isPremium) {
      return true;
    }
  }
  return false;
}

module.exports = {
  getIsPremiumContent,
};

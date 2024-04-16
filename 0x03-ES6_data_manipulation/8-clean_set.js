const cleanSet = (set, startString) => {
  if (!(set instanceof Set) || typeof startString !== 'string' || startString.length === 0) {
    return '';
  }

  const filteredItems = Array.from(set)
    .filter((item) => item && typeof item === 'string' && item.startsWith(startString))
    .map((item) => item.slice(startString.length));

  return filteredItems.join('-');
};

export default cleanSet;

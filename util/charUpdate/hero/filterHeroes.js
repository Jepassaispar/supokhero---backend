const checkStats = elem => {
  return !(
    (elem.appearance.height[1] === "0 cm" &&
      elem.appearance.weight[1] === "0 kg") ||
    elem.powerstats.intelligence === "null"
  );
};

const filterHeroes = (array1, array2) => {
  let filteredArray = array1.filter(
    (elem => !array2.find(({ name }) => elem.name === name) && checkStats(elem))
  );
  return [...array2, ...filteredArray].sort((a, b) =>
    a.name < b.name ? -1 : 1
  );
};

module.exports = filterHeroes;

const { filterPower, numberOfWords } = require('./../../../config/getMoves');

const checkSpaces = (elem, num) => {
	return elem.split(' ').length <= num;
};

const filterMoves = (array1, array2) => {
  let wordsArray = array2.reduce(
    (acc, val) => (acc = [...acc, ...val.split(" ")]),
    []
  );
  let filteredArray =
    filterPower && filterPower === "strong"
      ? array1.filter(elem1 => {
          return (
            !wordsArray.find(elem2 => elem1.includes(elem2)) &&
            checkSpaces(elem1, numberOfWords)
          );
        })
      : array1.filter(
          elem1 => !array2.find(elem2 => elem1 === elem2) && checkSpaces(elem1)
        );
  return [...array2, ...filteredArray].sort((a, b) => (a < b ? -1 : 1));
};

module.exports = filterMoves;

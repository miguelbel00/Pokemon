const upperCaseWord = (word) => {
  return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
};

const getTypes = (responseApi) => {
  return responseApi.data.results.map((t, i) => {
    return {
      id: i + 1,
      name: upperCaseWord(t.name),
    };
  });
};

module.exports = {
  getTypes,
};

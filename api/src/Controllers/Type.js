
const getTypes = (responseApi) => {

    return responseApi.data.results.map((t,i) => {
        return {
            "id": i+1,
            "name" : t.name
            }

    })

}


module.exports = {
    getTypes,
  };
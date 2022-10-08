const { DataTypes,UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      set(value){
        throw new Error("Please, Dont try to set id")
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    health : {
      type: DataTypes.INTEGER
    },
    attack : {
      type: DataTypes.INTEGER
    },
    defense : {
      type: DataTypes.INTEGER
    },
    speed : {
      type: DataTypes.INTEGER
    },
    height : {
      type: DataTypes.INTEGER
    },
    weight : {
      type: DataTypes.INTEGER
    },
    image : {
      type: DataTypes.TEXT,
      defaultValue: '../utils/pokemonEgg.png'
    },


  }, {
      timestamps: false,
    });
};

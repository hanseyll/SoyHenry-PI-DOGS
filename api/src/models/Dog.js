const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    height_min:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight_min:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height_max:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight_max:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: true
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname:{
      type:DataTypes.STRING,
      allowNull:false
    },
    description:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    image:{
      type:DataTypes.STRING,
      defaultValue:"https://storage.googleapis.com/pai-images/c9c952618607461d8b5d04ec86012661.jpeg",
      allowNull:true,
    },
    nationality:{
      type:DataTypes.STRING,
      allowNull:false
    },
    dob:{
      type:DataTypes.DATEONLY,
      allowNull:false
    },
    origin:{
      type:DataTypes.STRING,
      defaultValue:'Created'
    }

  },{timestamps:false, freezeTableName:true});
};
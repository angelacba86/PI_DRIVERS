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
      validate:{
        len:{
          arg:[3,15],
          msg:"Name must have between 3 and 15 characters."
        }
      }
    },
    surname:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:{
          arg:[3,15],
          msg:"The surname must have between 3 and 15 characters."
        }
      }
    },
    description:{
      type:DataTypes.STRING,
      allowNull:false,
      maxLength: 500,
      validate:{
        len:{
          arg:[10],
          msg:"The description must have at least 10 characters ."
        }
      }
    },
    image:{
      type:DataTypes.STRING,
      defaultValue:"https://storage.googleapis.com/pai-images/c9c952618607461d8b5d04ec86012661.jpeg",
      allowNull:true,
    },
    nationality:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:{
          arg:[5],
          msg:"Nationality must have at least 5 characters"
        }
      }
    },
    dob:{
      type:DataTypes.DATEONLY,
      allowNull:false,
      validate:{
        isBefore: {
          args: '2005-09-02', // Debe ser un día después de la fecha límite
          msg: "They must have been born on or before 2005-09-01."
        }
      }
    },
    origin:{
      type:DataTypes.STRING,
      defaultValue:'Created'
    }

  },{timestamps:false, freezeTableName:true});
};
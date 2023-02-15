const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minWeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxWeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minHeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxHeight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minLifeSpan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxLifeSpan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type:DataTypes.STRING,
      allowNull: true
    },
    createInDb: {
    type: DataTypes.BOOLEAN, // esto lo hacemos por si queremos llamar a un perro que solo este en la base de datos, es decir las que cree en nuestra base de datos se van a crear con esta propiedad.
    allowNull: false,
    defaultValue: true
  },
  
  },
  {
    timestamps: false,
  }
  );              
};
//id
//name=nombre
//weight = peso
//height=altura
//life_span= esperanza de vida
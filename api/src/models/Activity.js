const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// ID
// Nombre 
// Dificultad (Entre 1 y 5)
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    dificulty: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull: false
    },
    duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    season: {
        type: DataTypes.ENUM('summer', 'autumn', 'winter', 'spring'),
        allowNull: false,
    }

  });
};
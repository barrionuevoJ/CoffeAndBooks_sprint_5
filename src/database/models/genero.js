module.exports = (sequelize, DataTypes) => {
    let alias = "genero";

    let cols = {
      id_genero: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      genero: {
        type: DataTypes.STRING,
        allowNull: false,
      }

    };

    let config = { tableName: "genero", timestamps: false};
    return (genero = sequelize.define(alias, cols, config));
  };
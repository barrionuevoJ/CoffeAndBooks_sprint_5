module.exports = (sequelize, DataTypes) => {
    let alias = "autor";

    let cols = {
      id_autor: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      autor: {
        type: DataTypes.STRING,
        allowNull: false,
      }

    };

    let config = { tableName: "autor", timestamps: false};
    return (autor = sequelize.define(alias, cols, config));
  };
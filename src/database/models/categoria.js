module.exports = (sequelize, DataTypes) => {
    let alias = "categoria";

    let cols = {
      id_categoria: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      categoria: {
        type: DataTypes.STRING,
      }

    };

    let config = { tableName: "categoria", timestamps: false};
    return (categoria = sequelize.define(alias, cols, config));
  };
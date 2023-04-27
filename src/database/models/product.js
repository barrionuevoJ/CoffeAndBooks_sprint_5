module.exports = (sequelize, DataTypes) => {
  let alias = "Product";

  let cols = {
    id_product: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: {
        type: DataTypes.VARCHAR
    },
    descripcion: {

    }
  };

  let config = { tableName: "products" };
  return (Product = sequelize.define(alias, cols, config));
};

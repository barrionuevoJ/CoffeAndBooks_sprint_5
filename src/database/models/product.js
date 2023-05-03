module.exports = (sequelize, DataTypes) => {
  let alias = "Product";

  let cols = {
    id_product: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offer: {
      type: DataTypes.INTEGER,
    },
  };

  let config = { tableName: "products", timestamps: false};
  return (Product = sequelize.define(alias, cols, config));
};

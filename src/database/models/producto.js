module.exports = (sequelize, DataTypes) => {
  let alias = "Producto";

  let cols = {
    id_producto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descuento: {
      type: DataTypes.INTEGER,
    },
  };

  let config = { tableName: "productos", timestamps: false};
  return (Producto = sequelize.define(alias, cols, config));
};

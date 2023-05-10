module.exports = (sequelize, DataTypes) => {
    let alias = "Usuarios";

    let cols = {
      id_users: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileImg: {
        type: DataTypes.STRING,
        allowNull: false
      },
    };

    let config = { tableName: "users", timestamps: false};
    return (Usuarios = sequelize.define(alias, cols, config));
  };
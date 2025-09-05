import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export const Well = sequelize.define("Well", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: true },
  daily_production: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.ENUM("activo", "inactivo"), defaultValue: "activo" }
});

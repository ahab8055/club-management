"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.Teacher, { foreignKey: "teacher_id" });
    }
  }
  Student.init(
    {
      name: DataTypes.STRING,
      father: DataTypes.STRING,
      contact: DataTypes.STRING,
      address: DataTypes.STRING,
      game: DataTypes.STRING,
      time: DataTypes.TIME,
      teacher_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};

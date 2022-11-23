import { DataTypes } from 'sequelize'

const Categories = sequelize => {
  const Schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
  return sequelize.define('categories', Schema)
}

export default Categories

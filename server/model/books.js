import { DataTypes } from 'sequelize'

const Books = sequelize => {
  const Schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
  return sequelize.define('books', Schema)
}

export default Books

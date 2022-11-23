import { DataTypes } from 'sequelize'

const Reservations = sequelize => {
  const Schema = {
    reservation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }
  return sequelize.define('reservations', Schema)
}

export default Reservations

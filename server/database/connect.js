import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'

// [MODELIŲ IMPORTAI]
import { Users, Categories, Books, Reservations, Ratings } from '../model/index.js'

const database = {}

const credentials = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bit_library', // enter database name!
}

try {
  const connection = await mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
  })

  await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database)

  const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, {
    dialect: 'mysql',
  })

  // [MODELIŲ PRISKYRIMAI IR RELIACIJOS]
  database.users = Users(sequelize)
  database.categories = Categories(sequelize)
  database.books = Books(sequelize)
  database.reservations = Reservations(sequelize)
  database.ratings = Ratings(sequelize)

  database.categories.hasMany(database.books)
  database.books.belongsTo(database.categories)

  database.users.hasMany(database.reservations)
  database.reservations.belongsTo(database.users)

  database.users.hasMany(database.ratings)
  database.ratings.belongsTo(database.users)

  database.books.hasMany(database.reservations)
  database.reservations.belongsTo(database.books)

  database.books.hasMany(database.ratings)
  database.ratings.belongsTo(database.books)

  await sequelize.sync({ alter: false }) // change while working on models!
} catch {
  console.log('Database connection failed')
}

export default database

import express from 'express'
import cors from 'cors'
import session from 'express-session'

// TEMP DATABASE IMPORT
// import database from './database/connect.js'

// [CONTROLLERIŲ IMPORTAI]
import { Users, Categories, Books, Reservations, Ratings } from './controller/index.js'

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static('uploads'))

app.use(cors())

app.set('trust proxy', 1)

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 600000 },
  })
)

// [CONTROLLERIŲ PRISKYRIMAI]
app.use('/api/users/', Users)
app.use('/api/categories/', Categories)
app.use('/api/books/', Books)
app.use('/api/reservations/', Reservations)
app.use('/api/ratings/', Ratings)

app.listen(process.env.PORT || 3000)

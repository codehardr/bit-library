import express from 'express'
import db from '../database/connect.js'

// Middleware for uploading files via /new & /edit routes
import upload from '../middleware/multer.js'

import { workersValidator } from '../middleware/validate.js'
import { adminAuth } from '../middleware/auth.js'

// ratingams
import Sequelize from 'sequelize'

const router = express.Router()
const dbtable = db.workers

router.get('/', async (req, res) => {
  const options = {
    include: [
      { model: db.salons, attributes: ['name'] },
      // ratings table
      { model: db.ratings, attributes: ['rating'] },
    ],
    // ratings vidurkis
    attributes: {
      include: [[Sequelize.fn('AVG', Sequelize.col('ratings.rating')), 'avg_rating']],
    },
    // ratings grupavimas pagal id, kad kiekvienam o ne tik pirmam
    group: ['id'],
    // defaultinis sortinimas iš backo:
    // order: [[Sequelize.literal('avg_rating'), 'DESC']],
  }
  // salonų filtravimas pagal query
  if (req.query.salon) options.where = { salonId: req.query.salon }
  // salonų rūšiavimas pagal query
  if (req.query.sorting)
    options.order = [[Sequelize.literal('avg_rating'), req.query.sorting === '1' ? 'ASC' : 'DESC']]

  try {
    const data = await dbtable.findAll(options)
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.get('/single/:id', adminAuth, async (req, res) => {
  try {
    const data = await dbtable.findByPk(req.params.id)
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.post('/new', adminAuth, upload.single('photo'), workersValidator, async (req, res) => {
  try {
    if (req.file) req.body.photo = '/uploads/' + req.file.filename
    await dbtable.create(req.body)
    res.send('New data successfully added')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.put('/edit/:id', adminAuth, upload.single('photo'), workersValidator, async (req, res) => {
  try {
    if (req.file) req.body.photo = '/uploads/' + req.file.filename
    const data = await dbtable.findByPk(req.params.id)
    await data.update(req.body)
    res.send('Data successfully updated')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.delete('/delete/:id', adminAuth, async (req, res) => {
  try {
    const data = await dbtable.findByPk(req.params.id)
    await data.destroy()
    res.send('Data successfully removed')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

export default router

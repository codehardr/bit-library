import express from 'express'
import db from '../database/connect.js'
import { servicesValidator } from '../middleware/validate.js'
import { adminAuth } from '../middleware/auth.js'

const router = express.Router()
const dbtable = db.services

router.get('/', async (req, res) => {
  //pridedam salonų pavadinimus
  const options = { include: { model: db.salons, attributes: ['name'] } }
  // grąžina tik tas paslaugas (services) kurio salono page (salon/:id) esame
  if (req.query.salon) options.where = { salonId: req.query.salon }
  // if (req.query.sort === '1') options.order = [['name', 'ASC']]
  // if (req.query.sort === '2') options.order = [['name', 'DESC']]
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

router.post('/new', adminAuth, servicesValidator, async (req, res) => {
  try {
    await dbtable.create(req.body)
    res.send('New data successfully added')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.put('/edit/:id', adminAuth, servicesValidator, async (req, res) => {
  try {
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

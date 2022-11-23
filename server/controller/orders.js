import express from 'express'
import db from '../database/connect.js'
import { ordersValidator } from '../middleware/validate.js'
import { auth, adminAuth } from '../middleware/auth.js'

const router = express.Router()
const dbtable = db.orders

// ADMIN ORDERS
router.get('/admin', adminAuth, async (req, res) => {
  const options = {
    include: [
      { model: db.users, attributes: ['first_name', 'last_name'] },
      { model: db.services, attributes: ['name'] },
    ],
  }
  if (req.query.sort === '1') options.order = [['order_date', 'ASC']]
  if (req.query.sort === '2') options.order = [['order_date', 'DESC']]
  try {
    const data = await dbtable.findAll(options)
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

// USER ORDERS
router.get('/user', auth, async (req, res) => {
  // temp solution
  // const options = { where: { userId: 1 } }

  // final solution
  const options = { where: { userId: req.session.user.id } }

  options.include = [
    {
      model: db.services,
      attributes: ['name'],
      include: { model: db.salons, attributes: ['name'] },
    },
    { model: db.workers, attributes: ['first_name', 'last_name'] },
    { model: db.ratings },
  ]
  options.group = ['id']

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

router.post('/new', auth, ordersValidator, async (req, res) => {
  // temp solution
  req.body.userId = 1
  // final solution
  // req.body.userId = req.session.user.id

  try {
    await dbtable.create(req.body)
    res.send('New data successfully added')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.put('/edit/:id', adminAuth, ordersValidator, async (req, res) => {
  // temp solution
  req.body.userId = 1
  // final solution
  // req.body.userId = req.session.user.id

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

import express from 'express'
import db from '../database/connect.js'

import { ratingsValidator } from '../middleware/validate.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()
const dbtable = db.ratings

router.post('/worker/:wid/order/:oid', auth, ratingsValidator, async (req, res) => {
  // temp solution
  // req.body.userId = 1
  // final solution
  req.body.userId = req.session.user.id

  req.body.workerId = req.params.wid
  req.body.orderId = req.params.oid

  try {
    await dbtable.create(req.body)
    res.send('New data successfully added')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

export default router

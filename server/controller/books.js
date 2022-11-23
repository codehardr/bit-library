import express from 'express'
import db from '../database/connect.js'
import upload from '../middleware/multer.js'

// import { categoriesValidator } from '../middleware/validate.js'
// import { adminAuth } from '../middleware/auth.js'

const router = express.Router()
const dbtable = db.books

router.get('/', async (req, res) => {
  const options = { include: { model: db.categories, attributes: ['name'] } }
  try {
    const data = await dbtable.findAll(options)
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.get('/single/:id', async (req, res) => {
  try {
    const data = await dbtable.findByPk(req.params.id)
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.post('/new', upload.single('cover'), async (req, res) => {
  try {
    if (req.file) req.body.cover = '/uploads/' + req.file.filename
    await dbtable.create(req.body)
    res.send('New data successfully added')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.put('/edit/:id', upload.single('cover'), async (req, res) => {
  try {
    if (req.file) req.body.cover = '/uploads/' + req.file.filename
    const data = await dbtable.findByPk(req.params.id)
    await data.update(req.body)
    res.send('Data successfully updated')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.delete('/delete/:id', async (req, res) => {
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

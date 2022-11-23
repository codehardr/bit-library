import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const AddBook = () => {
  const navigate = useNavigate()

  const { setNotification } = useContext(MainContext)

  const [form, setForm] = useState({
    title: '',
    author: '',
    cover: '',
    categoryId: '',
  })

  // state 4 category selection
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get('/api/categories/')
      .then(resp => setData(resp.data))
      .catch(error => {
        console.log(error)
        setNotification({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [navigate, setNotification])

  const handleForm = e =>
    setForm({
      ...form,
      [e.target.name]: e.target.name === 'cover' ? e.target.files[0] : e.target.value,
    })

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    for (const key in form) formData.append(key, form[key])

    axios
      .post('/api/books/new', formData) //formData failams sendint!
      .then(resp => {
        setNotification({ msg: resp.data, status: 'success' })
        navigate('/admin/books')
      })
      .catch(error => {
        setNotification({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
        if (error.response.status === 401) navigate('/login')
      })
  }

  return (
    <>
      <h1>Add Book</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" onChange={handleForm} />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" onChange={handleForm} />
        </div>
        <div>
          <label>Cover:</label>
          <input type="file" name="cover" onChange={handleForm} />
        </div>
        <div>
          <label>Category:</label>
          <select name="categoryId" onChange={handleForm} required>
            <option value="">Select Category:</option>
            {data.map(entry => (
              <option key={entry.id} value={entry.id}>
                {entry.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input type="submit" value="Add" />
        </div>
      </form>
    </>
  )
}

export default AddBook

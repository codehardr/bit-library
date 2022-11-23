import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const EditBook = () => {
  const { id } = useParams()

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

  // formos su failais siuntimui
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
      .put('/api/books/edit/' + id, formData)
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

  useEffect(() => {
    axios
      .get('/api/books/single/' + id)
      .then(resp => setForm(resp.data))
      .catch(error => {
        setNotification({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [id, setNotification])

  return (
    <>
      <h1>Edit Book</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={form.title} onChange={handleForm} />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={form.author} onChange={handleForm} />
        </div>
        <div>
          <label>Cover:</label>
          <input type="file" name="cover" onChange={handleForm} />
        </div>
        {form.cover && typeof form.cover === 'string' && (
          <div>
            <img src={form.cover} alt={form.title} height="150" />
            <button onClick={e => setForm({ ...form, cover: '' })}>Remove Cover</button>
          </div>
        )}
        <div>
          <label>Category:</label>
          <select
            name="categoryId"
            onChange={handleForm}
            value={form.categoryId ? form.categoryId : ''}
          >
            <option value="">Select Category:</option>
            {data.map(entry => (
              <option key={entry.id} value={entry.id}>
                {entry.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input type="submit" value="Update" />
        </div>
      </form>
    </>
  )
}

export default EditBook

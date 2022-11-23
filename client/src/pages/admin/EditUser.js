import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const EditUser = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const { setNotification } = useContext(MainContext)

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
  })

  const handleForm = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .put('/api/users/edit/' + id, form)
      .then(resp => {
        setNotification({ msg: resp.data, status: 'success' })
        navigate('/admin/users')
      })
      .catch(error => {
        setNotification({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
        if (error.response.status === 401) navigate('/login')
      })
  }

  useEffect(() => {
    axios
      .get('/api/users/single/' + id)
      .then(resp => setForm(resp.data))
      .catch(error => {
        setNotification({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [id, setNotification])

  return (
    <>
      <h1>Edit User</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>First Name:</label>
          <input type="text" name="first_name" value={form.first_name} onChange={handleForm} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="last_name" value={form.last_name} onChange={handleForm} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleForm} />
        </div>
        <div>
          <label>Role:</label>
          <input type="number" name="role" value={form.role} onChange={handleForm} />
        </div>
        <div>
          <input type="submit" value="Update" />
        </div>
      </form>
    </>
  )
}

export default EditUser

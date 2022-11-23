import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const Users = () => {
  const navigate = useNavigate()

  const { notification, setNotification } = useContext(MainContext)

  const [data, setData] = useState([])

  const handleDelete = id => {
    axios
      .delete('/api/users/delete/' + id)
      .then(resp => {
        setNotification({ msg: resp.data, status: 'success' })
        window.scrollTo(0, 0)
      })
      .catch(error => {
        setNotification({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
        if (error.response.status === 401) navigate('/login')
      })
  }

  useEffect(() => {
    axios
      .get('/api/users/')
      .then(resp => setData(resp.data))
      .catch(error => {
        setNotification({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [notification, setNotification])

  return (
    <>
      <h1>Users</h1>
      {data ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map(entry => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.first_name}</td>
                <td>{entry.last_name}</td>
                <td>{entry.email}</td>
                <td>{entry.role}</td>
                <td>
                  <Link className="btn" to={'/admin/users/edit/' + entry.id}>
                    Update
                  </Link>
                  <button className="btn" onClick={() => handleDelete(entry.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No Users Found...</h2>
      )}
    </>
  )
}

export default Users

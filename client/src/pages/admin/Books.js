import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'
import defaultProfile from '../../resources/default-profile.png'

const Books = () => {
  const navigate = useNavigate()

  const { notification, setNotification } = useContext(MainContext)

  const [data, setData] = useState([])

  const handleDelete = id => {
    axios
      .delete('/api/books/delete/' + id)
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
      .get('/api/books/')
      .then(resp => setData(resp.data))
      .catch(error => {
        setNotification({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [notification, setNotification])

  return (
    <>
      <h1>Books</h1>
      {data ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(entry => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>
                  {entry.cover ? (
                    <img src={entry.cover} alt={entry.title} height="75" />
                  ) : (
                    <img src={defaultProfile} alt="Default Cover" height="75" />
                  )}
                </td>
                <td>{entry.title}</td>
                <td>{entry.author}</td>
                {/* norint paimti duomenis iš kitos lentos, reikia back'e prie findAll() pridėti include'ą */}
                <td>{entry.category?.name}</td>
                <td>
                  <Link className="btn" to={'/admin/books/edit/' + entry.id}>
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
        <h2>No Books Found...</h2>
      )}
      <Link to={'/admin/books/new'} className="btn btn-add">
        Add Book
      </Link>
    </>
  )
}

export default Books

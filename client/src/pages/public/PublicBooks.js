import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import MainContext from '../../context/MainContext'
import defaultProfile from '../../resources/default-profile.png'

const PublicBooks = () => {
  const { notification, setNotification } = useContext(MainContext)

  const [data, setData] = useState([])

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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No Books Found...</h2>
      )}
    </>
  )
}

export default PublicBooks

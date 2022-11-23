import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../context/MainContext'

const Header = () => {
  const navigate = useNavigate()

  const { setNotification, userInfo, setUserInfo } = useContext(MainContext)

  const handleLogout = () => {
    axios.get('/api/users/logout/').then(resp => {
      setUserInfo({})
      setNotification({ msg: resp.data, status: 'success' })
      navigate('/')
    })
  }

  return (
    <header>
      <div className="logo">Bit Library</div>
      <nav>
        <ul>
          <li>
            <div>Public:</div>
          </li>
          <li>
            <Link to="/">Books</Link>
          </li>
        </ul>
        {userInfo.role === 1 && (
          <ul>
            <li>
              <div>Admin:</div>
            </li>
            <li>
              <Link to="/admin/books">Books</Link>
            </li>
            <li>
              <Link to="/admin/users">Users</Link>
            </li>
          </ul>
        )}
      </nav>
      {userInfo.id ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/register">Register</Link>
          <Link to="/login" className="gold">
            Login
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header

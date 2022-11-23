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
      <div className="logo">Skeleton Stack</div>
      <nav>
        <div>Public:</div>
        <ul>
          <li>
            <Link to="/">Salons</Link>
          </li>
          <li>
            <Link to="/workers">Workers</Link>
          </li>
          {userInfo.role === 0 && (
            <li>
              <Link to="/orders">Orders</Link>
            </li>
          )}
        </ul>
        {userInfo.role === 1 && (
          <>
            <div>Admin:</div>
            <ul>
              <li>
                <Link to="/admin/salons">Salons</Link>
              </li>
              <li>
                <Link to="/admin/services">Services</Link>
              </li>
              <li>
                <Link to="/admin/workers">Workers</Link>
              </li>
              <li>
                <Link to="/admin/orders">Orders</Link>
              </li>
            </ul>
          </>
        )}
        {userInfo.id ? (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

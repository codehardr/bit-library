import { Link } from 'react-router-dom'

const Header = () => {
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
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
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
      </nav>
    </header>
  )
}

export default Header

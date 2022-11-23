import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className="logo">Bit Library</div>
      <nav>
        <div>Admin:</div>
        <ul>
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

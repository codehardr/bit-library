import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header'
import MainContext from './context/MainContext'
import Notification from './components/Notification'

// ADMIN Routes
import Books from './pages/admin/Books'
import AddBook from './pages/admin/AddBook'
import EditBook from './pages/admin/EditBook'
import Users from './pages/admin/Users'
import EditUser from './pages/admin/EditUser'

// PUBLIC Routes
import PublicBooks from './pages/public/PublicBooks'
import Register from './pages/public/Register'
import Login from './pages/public/Login'

const App = () => {
  const [notification, setNotification] = useState({ msg: '', status: '' })

  const [userInfo, setUserInfo] = useState({})

  const contextValues = { notification, setNotification, userInfo, setUserInfo }

  useEffect(() => {
    axios.get('/api/users/check-auth/').then(resp => setUserInfo(resp.data))
  }, [])

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Notification />
          <Routes>
            {userInfo.role === 1 && (
              <Route path="admin">
                <Route path="books" element={<Books />} />
                <Route path="books/new" element={<AddBook />} />
                <Route path="books/edit/:id" element={<EditBook />} />
                <Route path="users" element={<Users />} />
                <Route path="users/edit/:id" element={<EditUser />} />
              </Route>
            )}
            <Route path="/" element={<PublicBooks />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App

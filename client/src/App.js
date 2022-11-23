import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import MainContext from './context/MainContext'
import Notification from './components/Notification'

// ADMIN Routes
import Books from './pages/admin/Books'
import AddBook from './pages/admin/AddBook'
import EditBook from './pages/admin/EditBook'
import Users from './pages/admin/Users'
import EditUser from './pages/admin/EditUser'

const App = () => {
  const [notification, setNotification] = useState({ msg: '', status: '' })

  const contextValues = { notification, setNotification }

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Notification />
          <Routes>
            <Route path="admin">
              <Route path="books" element={<Books />} />
              <Route path="books/new" element={<AddBook />} />
              <Route path="books/edit/:id" element={<EditBook />} />
              <Route path="users" element={<Users />} />
              <Route path="users/edit/:id" element={<EditUser />} />
            </Route>
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// ADMIN Routes
import Books from './pages/admin/Books'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin">
          <Route path="books" element={<Books />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

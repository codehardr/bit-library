import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin"></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

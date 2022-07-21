import 'bootstrap/dist/css/bootstrap.css'
import './assets/style/style.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Edit from './pages/Edit'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  )
}

export default App

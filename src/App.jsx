import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateLogPage from './pages/CreateLogPage'
import LogDetailsPage from './pages/LogDetailsPage'
import LogEditPage from './pages/LogEditPage'
import LogsListPage from './pages/LogsListPage'

function App() {
return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/logs" element={<LogsListPage />}/>
      <Route path="/logs/new" element={<CreateLogPage />}/>
      <Route path="/logs/:id" element={<LogDetailsPage />}/>
      <Route path="/logs/:id/edit" element={<LogEditPage />}/>
    </Routes>
  </BrowserRouter>
)
}

export default App

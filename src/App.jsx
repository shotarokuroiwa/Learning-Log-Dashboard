import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateLogPage from './pages/CreateLogPage'
import LogDetailsPage from './pages/LogDetailsPage'
import LogEditPage from './pages/LogEditPage'
import LogsListPage from './pages/LogsListPage'
import NotFoundPage from './pages/NotFoundPage'
import { useEffect, useState } from 'react'
import fetchLogs from './api/api'

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLogs = async () => {
        setLoading(true);
        const data = await fetchLogs();
        setLogs(data);
        setLoading(false);
    };
    getLogs();
  }, []);
  
  if (loading) {
    return (
      <div>読み込み中...</div>
    )
  }

return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/logs" element={<LogsListPage logs={logs} />}/>
      <Route path="/logs/new" element={<CreateLogPage />}/>
      <Route path="/logs/:id" element={<LogDetailsPage />}/>
      <Route path="/logs/:id/edit" element={<LogEditPage />}/>
      <Route path="*" element={<NotFoundPage />}/>
    </Routes>
  </BrowserRouter>
)
}

export default App

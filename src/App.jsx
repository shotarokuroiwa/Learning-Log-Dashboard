import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateLogPage from "./pages/CreateLogPage";
import LogDetailsPage from "./pages/LogDetailsPage";
import LogEditPage from "./pages/LogEditPage";
import LogsListPage from "./pages/LogsListPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect, useState } from "react";
import fetchLogs from "./api/api";
import useLocalStorage from "./hooks/useLocalStorage";
import Layout from "./components/Layout";

function App() {
  const [JSONerror, setJSONError] = useState(null);
  const [logs, setLogs] = useLocalStorage("logs", [], setJSONError);
  const [mockLogs, setMockLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const getLogs = async () => {
      if (logs.length === 0) {
        try {
          const data = await fetchLogs();
          if (!ignore) {
            setMockLogs(data);
          }
        } finally {
          if (!ignore) {
            setLoading(false);
          }
        }
      } else {
        setLoading(false);
      }
    };
    getLogs();

    return () => (ignore = true);
  }, []);

  // mocklogとユーザ作成logを分岐
  const dispalyLogs = logs.length > 0 ? logs : mockLogs;

  if (JSONerror) {
    return <div style={{ color: "red" }}>{JSONerror}</div>;
  }

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home logs={dispalyLogs} />} />
          <Route path="/logs" element={<LogsListPage logs={dispalyLogs} />} />
          <Route
            path="/logs/new"
            element={<CreateLogPage setLogs={setLogs} />}
          />
          <Route
            path="/logs/:id"
            element={<LogDetailsPage logs={dispalyLogs} setLogs={setLogs} />}
          />
          <Route
            path="/logs/:id/edit"
            element={<LogEditPage logs={dispalyLogs} setLogs={setLogs} />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

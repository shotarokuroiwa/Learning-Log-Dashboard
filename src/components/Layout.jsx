import { Link, Outlet } from 'react-router-dom';
import './css/Layout.css'

const Layout = () => {
  return (
    <div className="layout-shell">
      <aside className="layout-sidebar">
        <h2>Learning Log Dashboard</h2>
        <nav className="layout-nav">
          <Link to="/">ダッシュボード</Link>
          <Link to="/logs">タスク一覧</Link>
          <Link to="/logs/new">新規作成</Link>
        </nav>
      </aside>

      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
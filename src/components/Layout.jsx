import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <aside style={{
        width: '240px',
        height: '100vh',
        position: 'fixed',
        top: 20,
        left: 0,
        backgroundColor: '#000000',
        borderRight: '1px solid #ddd',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <h2>Learning Log</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/">ダッシュボード</Link>
          <Link to="/logs">ログ一覧</Link>
          <Link to="/logs/new">新規作成</Link>
        </nav>
      </aside>

      <main style={{
        marginLeft: '240px', 
        flexGrow: 1,
        padding: '30px',
        minHeight: '100vh'
      }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
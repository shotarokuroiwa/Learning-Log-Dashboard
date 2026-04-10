function LogsListPage({ logs }) {
  return (
    <div>
      <h1>ToDO List</h1>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            {log.date} : {log.title} ({log.minutes}分)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LogsListPage;
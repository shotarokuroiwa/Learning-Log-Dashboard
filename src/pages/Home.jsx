import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ logs }) => {
  const tags = useMemo(() => {
    // 合計時間
    const totalMinutes = logs.reduce((sum, log) => sum + log.minutes,0);
    
    // 完了タスク
    const completeLogs = logs.filter(log => log.status === 'done');

    // 完了タスク件数
    const completeCount = completeLogs.length;

    // カテゴリ別タスク分け
    const categoryCounts = logs.reduce((sum, log) => {
      const key = log.category;

      !sum[key] && (sum[key] = []);
      sum[key].push(log);
      return sum;
    }, {})

    // 最近のタスク
    // 新しいほうが前に来るように引き算は逆にする
    const recentLogs = [...logs]
      .sort((a,b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    return {totalMinutes,completeLogs, completeCount, categoryCounts, recentLogs}
  }, [logs]);
    
      
  return (
    <div className="dashboard">
      <h1>ダッシュボード</h1>
      
      <div className="tags-grid">
        <div className="card">
          <h3>合計時間</h3>
          <p>{tags.totalMinutes} 分</p>
        </div>

        <div className="card">
          <h3>完了タスク</h3>
          {tags.completeCount === 0 ? (
            <p>完了したタスクはありません</p>
          ) : (
          <ul>
            <p>{tags.completeCount} 件</p>
            {tags.completeLogs.map(log => (
              <li key={log.id}>
                <Link to={`/logs/${log.id}`}>
                  {log.title}
                </Link>
              </li>
            ))}
          </ul>
          )}
          <p>x</p>
        </div>
      </div>

      <section>
        <h3>カテゴリー別</h3>
        {Object.entries(tags.categoryCounts).map(([category, logs]) => (
          <div key={category}>
            <h4>
              {category} ({logs.length}件)
            </h4>
            
            <ul>
              {logs.map((log) => (
                <li key={log.id}>
                  <Link to={`/logs/${log.id}`}>
                    {log.date}: {log.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h3>最近の記録</h3>
        <ul>
          {tags.recentLogs.map(log => (
            <li key={log.id}>
              <Link to={`/log/${log.id}`}>
                {log.date}: {log.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Home
import { useMemo } from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./css/Home.css";
import { CATEGORIES } from "../utils/labels";

const Home = ({ logs }) => {
  useDocumentTitle("ダッシュボード");
  const tags = useMemo(() => {
    // 合計時間
    const totalMinutes = logs.reduce((sum, log) => sum + log.minutes, 0);

    // 完了ログ
    const completeLogs = logs.filter((log) => log.status === "done");

    // 完了ログ件数
    const completeCount = completeLogs.length;

    // カテゴリ別ログ分け
    const categoryCounts = logs.reduce((sum, log) => {
      const key = log.category;

      !sum[key] && (sum[key] = []);
      sum[key].push(log);
      return sum;
    }, [logs]);

    // 最近のログ（日付が新しい順）
    const recentLogs = [...logs]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    return {
      totalMinutes,
      completeLogs,
      completeCount,
      categoryCounts,
      recentLogs,
    };
  }, [logs]);

  return (
    <div>
      <h1 className="homeh1">ダッシュボード</h1>
      <div className="dashboard">
        <div className="tags-grid">
          <div className="card">
            <h3>合計時間</h3>
            <p>{tags.totalMinutes} 分</p>
          </div>

          <div className="card donetask task">
            <h3>完了ログ</h3>
            {tags.completeCount === 0 ? (
              <p>完了したログはありません</p>
            ) : (
              <ul>
                <p>{tags.completeCount} 件</p>
                {tags.completeLogs.map((log) => (
                  <li key={log.id}>
                    <Link to={`/logs/${log.id}`}>{log.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <section className="task">
          <h3>カテゴリー別</h3>
          {Object.entries(tags.categoryCounts).map(([category, logs]) => (
            <div key={category}>
              <h4>
                {CATEGORIES[category]} ({logs.length}件)
              </h4>

              <ul>
                {logs.map((log) => (
                  <li key={log.id}>
                    <Link to={`/logs/${log.id}`}>
                      {log.date.slice(5)}: {log.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="task">
          <h3>最近のログ</h3>
          <ul>
            {tags.recentLogs.map((log) => (
              <li key={log.id}>
                <Link to={`/logs/${log.id}`}>
                  {log.date.slice(5)}: {log.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;

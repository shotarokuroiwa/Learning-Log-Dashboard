import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import useLogsFilter from '../hooks/useLogsFilter';
import { CATEGORY_LABELS } from '../utils/labels'
import useDocumentTitle from '../hooks/useDocumentTitle'

function LogsListPage({ logs }) {
  useDocumentTitle("ログリスト")
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || "";
  const [inputValue, setInputValue] = useState(query);

  const { filteredLogs, updateParams } = useLogsFilter(logs, inputValue);

  return (
    <div className="logs-container">
      <h1>学習ログ一覧</h1>
      <Link to="/">戻る</Link>
      <Link to="/logs/new">新規作成</Link>

      <div className="filter-controls">
        <input 
          type="text"
          placeholder="タイトルで検索..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <select 
          value={searchParams.get('category') || 'all'}
          onChange={(e) => updateParams('category', e.target.value)}
        >
          <option value="all">カテゴリ</option>
          {CATEGORY_LABELS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}

          </select>

        <select
          value={searchParams.get('status') || 'all'}
          onChange={(e) => updateParams('status', e.target.value)}
          aria-label="進捗で絞り込み"
        >
          <option value="all">ステータス</option>
          <option value="planned">計画中</option>
          <option value="doing">進行中</option>
          <option value="done">完了</option>
        </select>

        <select 
          value={searchParams.get('sort') || 'newest'}
          onChange={(e) => updateParams('sort', e.target.value)}
        >
          <option value="newest">新しい順</option>
          <option value="oldest">古い順</option>
          <option value="longest">時間（長い順）</option>
        </select>
      </div>

      <div className="logs-list">
        {filteredLogs.length > 0 ? (
          filteredLogs.map(log => (
            <div key={log.id} className="log-item-card">
              <Link to={`/logs/${log.id}`}>
                <div className="log-header">
                <h3>{log.title}</h3>
                  <span>{log.date}</span>
                  <span className={`tag ${log.category}`}>{log.category}</span>
                  <span className={`tag status-${log.status}`}>{log.status}</span>
                </div>
                <p>{log.minutes} 分</p>
              </Link>
            </div>
          ))
        ) : (
          <p>該当するログが見つかりませんでした。</p>
        )}
      </div>
    </div>
  );
}

export default LogsListPage;
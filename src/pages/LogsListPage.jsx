import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import useLogsFilter from '../hooks/useLogsFilter';
import { CATEGORY_LABELS } from '../utils/labels'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './css/LogList.css'

function LogsListPage({ logs }) {
  useDocumentTitle("タスク一覧")
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search') || "";
  const [inputValue, setInputValue] = useState(query);

  const { filteredLogs, updateParams } = useLogsFilter(logs, inputValue);

  return (
    <div className="logs-container">
      <h1>タスク一覧</h1>
      <div className="filter-controls">
        <input 
          type="text"
          placeholder="タイトルで検索..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <div className='select-tab'>
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
      </div>

      <div className="logs-list">
        {filteredLogs.length > 0 ? (
          filteredLogs.map(log => (
            <div key={log.id} className="log-item-card">
              <Link to={`/logs/${log.id}`}>
                <div className="log-header">
                  <h3>{log.title}</h3>
                    <p>{log.date}</p>
                    <p>{log.category}</p>
                    <p>{log.status}</p>
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
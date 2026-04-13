import { useParams, useNavigate, Link } from 'react-router-dom'
import { CATEGORIES, STATUS_LABELS} from '../utils/labels'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './css/LogDetails.css'

const LogDetailsPage = ({ logs, setLogs }) => {
  useDocumentTitle("詳細")
  const { id } = useParams();
  const navigate = useNavigate();

  const log = logs.find((log) => log.id === Number(id));

  if (!log) {
    return (
      <div>
        <p>ログが見つかりませんでした</p>
        <Link to="/logs">一覧に戻る</Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("本当に削除しますか？")) {
      setLogs((prev) => prev.filter((item) => item.id !== log.id));
      navigate("/logs");
    }
  };

  return (
    <div>
      <h1>{log.title}</h1>
      <div className='detail-card'>
        <div>
          <label>日付:</label>
          <p>{log.date}</p>
        </div>
        <div>
          <label>カテゴリー:</label>
          <p>{CATEGORIES[log.category]}</p>
        </div>
        <div>
          <label>時間:</label>
          <p>{log.minutes}</p>
        </div>
        <div>
          <label>ステータス:</label>
          <p>{STATUS_LABELS[log.status]}</p>
        </div>
        <div>
          <label>メモ:</label>
          <p>{log.memo}</p>
        </div>
        <div>
          <label>お気に入り:</label>
          <p>{log.favorite ? "○" : "✕"}</p>
        </div>
      </div>

      <div className='actions'>
        <button onClick={() => navigate(`/logs/${log.id}/edit`)}>編集する</button>
        <button className="delete" onClick={handleDelete}>削除する</button>
        <button className="back" onClick={() => navigate(-1)}>戻る</button>
      </div>
    </div>
  ) 
}

export default LogDetailsPage

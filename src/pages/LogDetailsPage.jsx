import { useParams, useNavigate, Link } from 'react-router-dom'
import { CATEGORIES, STATUS_LABELS} from '../utils/labels'
import useDocumentTitle from '../hooks/useDocumentTitle'

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
        <p>日付: {log.date}</p>
        <p>時間: {log.minutes}</p>
        <p>カテゴリー: {CATEGORIES[log.category]}</p>
        <p>ステータス: {STATUS_LABELS[log.status]}</p>
        <p>メモ: {log.memo}</p>
        <p>お気に入り: {log.favorite ? "★" : "☆" }</p>
      </div>

      <div className='actions'>
        <button onClick={() => navigate(`/logs/${log.id}/edit`)}>編集する</button>
        <button onClick={handleDelete}>削除する</button>
        <button onClick={() => navigate(`/logs`)}>戻る</button>
      </div>
    </div>
  ) 
}

export default LogDetailsPage

import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState } from 'react'

const LogEditPage = ({ logs, setLogs }) => {
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

  const [formData, setFormData] = useState({
    title: log?.title || "",
    date: log?.date || "",
    minutes: log?.minutes || "",
    category: log?.category || "",
    status: log?.status || "planned",
    memo: log?.memo || "",
    favorite: log?.favorite || false,
  })
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({...prev, [name]: type === 'checkbox' ? checked : value,}));
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    
    setLogs((prev) => prev.map((log) => 
      log.id === Number(id) ? {...log, ...formData, minutes: Number(formData.minutes)}: log)); 
    
    navigate(`/logs/${id}`)
  };
  
  return (
    <div>
      <h1>ログの編集</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>タイトル:</label>
          <input name="title" value={formData.title} onChange={handleChange} />
        </div>
        
        <div>
          <label>日付:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>

        <div>
          <label>カテゴリー:</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="remind">リマインド</option>
            <option value="tech">技術学習</option>
            <option value="meeting">ミーティング</option>
          </select>
        </div>

        <div>
          <label>時間 (分):</label>
          <input type="number" name="minutes" value={formData.minutes} onChange={handleChange} />
        </div>

        <div>
          <label>メモ:</label>
          <textarea name="memo" value={formData.memo} onChange={handleChange} />
        </div>

        <div>
          <label>
            <input type="checkbox" name="favorite" checked={formData.favorite} onChange={handleChange} />
            お気に入り
          </label>
        </div>

        <button type="submit">更新</button>
        <button type="button" onClick={() => navigate(-1)}>キャンセル</button>
      </form>
    </div>
  )
}

export default LogEditPage

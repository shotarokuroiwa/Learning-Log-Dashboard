import { useState } from "react"
import { Link } from "react-router-dom"

const LogForm = ({ initialvalue, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState(initialvalue);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({...prev, [name]: type === 'checkbox' ? checked : value,}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData)
  };

  return (
    <form onSubmit={handleSubmit}>
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
          <textarea name="memo" value={formData.memo} onChange={handleChange}></textarea>
        </div>

        <div>
          <label>
            <input type="checkbox" name="favorite" checked={formData.favorite} onChange={handleChange} />
            お気に入り
          </label>
        </div>
        <button type="submit">{buttonText}</button>
        <Link to="/logs">戻る</Link>
    </form>
  )
}

export default LogForm;
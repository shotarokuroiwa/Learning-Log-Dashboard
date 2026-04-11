import { useState } from "react"
import { Navigate } from "react-router-dom"
import { CATEGORY_LABELS } from "../utils/labels";

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
          {CATEGORY_LABELS.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
          ))}
          </select>
        </div>

        <div>
          <label>時間 (分):</label>
          <input type="number" name="minutes" value={formData.minutes} onChange={handleChange} />
        </div>

        <div>
          <label>ステータス</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="planned">計画中</option>
            <option value="doing">進行中</option>
            <option value="done">達成済み</option>
          </select>
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
        <button onClick={() => Navigate(-1)}>キャンセル</button>

    </form>
  )
}

export default LogForm;
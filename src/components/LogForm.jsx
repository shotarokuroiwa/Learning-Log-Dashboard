import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CATEGORY_LABELS } from "../utils/labels";
import "./css/LogForm.css"

const LogForm = ({ initialvalue, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState(initialvalue);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({...prev, [name]: type === 'checkbox' ? checked : value,}));
  };

  const validate = () => {
    const Errors = {};

    if (!formData.title.trim()) {
      Errors.title = "タイトルは必須です";
    }
    if (formData.minutes <= 0) {
      Errors.minutes = "時間は1分以上を入力してください";
    }
    setErrors(Errors);
    return Object.keys(Errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return; 
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="log-form">
        <div>
          {errors.title && <span className="error-message">{errors.title}</span>} 
          {errors.minutes && <span className="error-message">{errors.minutes}</span>} 
        </div>

        <div>
          <label>タイトル:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className={errors.title ? "input-error" : ""} />
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
          <input type="number" name="minutes" value={formData.minutes} onChange={handleChange} className={errors.minutes ? "input-error" : ""} /> 
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
        <button type="button" onClick={() => navigate(-1)}>キャンセル</button>

    </form>
  )
}

export default LogForm;

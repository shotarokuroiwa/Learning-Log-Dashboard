import { useNavigate } from "react-router-dom"
import LogForm from "../components/LogForm";
import useDocumentTitle from '../hooks/useDocumentTitle'

const CreateLogPage = ({ setLogs }) => {
  useDocumentTitle("新規作成");
  const navigate =useNavigate();

  const handleCreate = (input) => {
    const newLog = {...input, id: Date.now(), minutes: Number(input.minutes) };
    setLogs((prev) => [newLog, ...prev]);
    navigate("/logs");
  };

  const init = {
    "title": "",
    "category": "",
    "minutes": 0,
    "status": "planned", 
    "date": new Date().toISOString().split('T')[0],
    "memo": "",
    "favorite": false
  }

  return (
    <div>
      <h1>新規作成</h1>
        <LogForm
          initialvalue={init}
          onSubmit={handleCreate}
          buttonText="登録する"
        />
    </div>
  )
}

export default CreateLogPage
import { useNavigate } from "react-router-dom"
import LogForm from "../components/LogForm";

const CreateLogPage = ({ setLogs }) => {
  const navigate =useNavigate();

  const handleCreate = (input) => {
    const newLog = {...input, id: Date.now(), minutes: Number(input.minutes) };
    setLogs((prev) => [newLog, ...prev]);
    navigate("/logs");
  };

  const init = {
    "title": "",
    "minutes": 0,
    "category": "",
    "status": "planned",
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
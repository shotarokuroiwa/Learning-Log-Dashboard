import { useNavigate, useParams, Link } from "react-router-dom";
import LogForm from "../components/LogForm";
import useDocumentTitle from "../hooks/useDocumentTitle";

const LogEditPage = ({ logs, setLogs }) => {
  useDocumentTitle("編集");
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

  const handleUpdate = (input) => {
    setLogs((prev) =>
      prev.map((log) =>
        log.id === Number(id)
          ? { ...input, minutes: Number(input.minutes) }
          : log,
      ),
    );

    navigate(`/logs/${id}`);
  };

  return (
    <div>
      <h1>ログの編集</h1>
      <LogForm
        key={log.id}
        initialvalue={log}
        onSubmit={handleUpdate}
        buttonText="更新する"
      />
    </div>
  );
};

export default LogEditPage;

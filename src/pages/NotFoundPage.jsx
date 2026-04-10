import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - ページが見つかりませんでした</h1>
      <p>お探しのページは存在しないか、移動した可能性があります</p>
      <Link to="/">トップページへ戻る</Link>
    </div>
  ) 
}

export default NotFoundPage
# IMPLEMENTATION NOTES


## state の持ち主一覧

| state名 | 保持場所 | 場所の理由 |
| --- | --- | --- |
| logs | App | 複数画面（ダッシュボード・一覧・詳細・編集）で共有するため |
| mockLogs | App | 初期表示用データとして使用するため |
| loading | App | データ取得中の状態をアプリ全体で制御するため |
| JSONerror | App | localStorageエラーを検知し全体に表示するため |
| inputValue | LogsListPage | 検索入力状態を管理するため |IMPLEMENTATION NOTES
| formData | LogForm | フォーム入力状態を管理するため |
| errors | LogForm | フォーム入力時のバリデーションを管理するため |


## ustom hook の説明

| hook名 | 目的 | 内容 |
| --- | --- | --- |
| useLocalStorage | データの永続化 | localStorageから初期値取得・state変更時に保存 |
| useLogsFilter | フィルタ・ソート・URL同期 | 絞り込み・並び替え・クエリパラメータ管理 |
| useDocumentTitle | ページタイトル管理 | document.titleを更新し、離脱時に元に戻す |
| useDebounce | 検索入力の最適化 | 一定時間後に値を更新 |


## useEffect の依存配列の理由

| 対象 | 依存配列 | 理由 |
| --- | --- | --- |
| App | [] | 初回マウント時のみ実行するため |
| useLocalStorage | [key, value] | 保存対象が変更されたときのみlocalStorageを更新するため
keyは将来的なバグを防ぐため |
| useLogsFilter | [debouncedSearch,updateparams] | debounce後の値変更時のみURL更新し、関数の参照変化にも対応するため |
| useDebounce | [value, time] | 入力値または遅延時間変更時に再設定するため |
| useDocumentTitle | [title] | タイトル変更時のみ更新するため |


## cleanup の説明

| 対象 | 内容 | 目的 |
| --- | --- | --- |
| App | ignoreフラグで古い
データ取得を無視 | アンマウント後のコンポーネント更新を防ぐ |
| useDebounce | clearTimeout | 不要なタイマーの残存を防ぐ |
| useDocumentTitle | 元のタイトルに戻す | ページ遷移後のタイトル残留を防ぐ |


## 苦労した点

- stateをどのコンポーネントに持たせるかの判断
- useEffectの依存配列の設計
- フィルタリング内容とクエリパラメータの同期
- debounceとuseEffectの組み合わせの理解
- ユーザが作ったlogとmocklogの切り替え処理
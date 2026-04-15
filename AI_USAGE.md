# AI USAGE


## 使用したAIツール

- ChatGPT
- Cursor
- Gemini


## 用途

- 課題要件を満たしているかの確認（達成度のチェック、不足機能の洗い出し）
- 不足していたフィールドをほかのフォーマットに合わせて実装
- エラーメッセージの意味の把握
- 画面が表示されない場合や不具合発生時の原因調査
- 文法ミスや誤字脱字の確認


## どのファイルで参照したか

|  | ファイル名 | 内容 |
| --- | --- | --- |
| １ | App.jsx | useEffect 内でのデータ取得方法の指摘 |
| ２ | hooks/useLocalStorage.js | mockデータを毎回フィルタリングしている点の指摘 |
| ３ | components/Layout.jsx | 表示されない原因の探索 |
| ４ | components/LogForm.jsx | バリデーション機能不足の指摘 |
| ５ | pages/LogsListPage.jsx | 不足していたstatusフィルタの追加 |
| ６ | hooks/useDocumentTitle.js | 未実装の指摘 |
| ７ | pages/LogsListPage.jsx | 入力されるたびに再レンダリングが起きる点の指摘 |
| ８ | hooks/useLogsFilter.js | useEffectとupdateParamsで無限ループが発生している点の指摘 |
| ９ | pages/LogEditPage.jsx | 入力されたフォーム情報が引き継がれる点の指摘 |
| 10 | /* | 細かい品質・仕様のずれの指摘 |


## 最終的にどう自分で直したか

- 不足機能については公式ドキュメントや記事、で使い方を学んでから実装
- AIが提示したコードはそのまま使用せず、内容を理解した上で自分で書き直した
- 指摘された部分について、必要性を吟味してから修正するかしないかを決めた
- どんなバグやエラーが発生するのか、この先発生しうるのかとセットで修正・追加

- 具体的な修正内容（※上の表と同番号）

|  | 修正内容 |
| --- | --- |
| １ | ignoreフラグでAPIを叩いている最中に画面遷移した時などに、state更新を無効化 |
| ２ | mockデータをmockLogs、ユーザが作ったタスクはlogsに分け表示切替 |
| ３ | Routesの外になったのを中に入れた |
| ４ | validate関数を実装し、falseの場合はsubmitを無効 |
| ５ | ほかのフィルタと同様に追加するように依頼 |
| ６ | useRefを使って実装 |
| ７ | 入力のたびにstateが更新され再レンダリングが発生するため、useDebounceを実装して一定時間後のみstate更新をするようにした |
| ８ | updateParamsの依存配列にsearchParamsがあるからループを引き起こしていたため、更新関数の引数でsearchParamsを取得し依存配列からsearchParamsを消した |
| ９ | `key={log.id}`を追加し、別IDになったらstateを初期化 |
| 10 | 適宜修正 |
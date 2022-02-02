import React, {useState} from "react"

import { useParams, Link, useMatch } from "react-router-dom"

const Side = () => {
  const [ title_1, setTitle1 ] = useState("課題一覧")
  const [ title_2, setTtile2 ] = useState("課題追加")
  // const [ toggle , setToggle ] = useState(false)  

  const tasksList = useMatch("/") ? "gray" : ""
  const addTasks = useMatch("/new") ? "gray" : ""
  
  return (
    <ul className="side-bar__ul">
      <li>
        {/** !
         * なぜ<a></a>にしてたんですっけ？？
         * アンカーだとページ全体がリフレッシュしてしまい、せっかくreactで組んだSPAが台無しです。
         * Linkを使うことでreact-routerの動作によりコンポーネントの描画が行われ、
         * 高速な動作が保証されるのです。
         * 通常はLinkを使いましょう。
         */}
            ????????????????
            質問 下記一つ目のリンクをクリックした場合にページングを1に戻し
            データをfetchしなおしたいのですが、URLが変わった
            時にoffsetを更新しようとすると、再レンダーが多すぎるというエラーと
            なってしまいます。いい書き方はありますでしょうか？
            ????????????????
        <Link to="/" className={tasksList}>{title_1}</Link>
      </li>
      <li>
        <Link to="/new" className={addTasks}>{title_2}</Link>
      </li>
    </ul>
  )
  }

export default Side
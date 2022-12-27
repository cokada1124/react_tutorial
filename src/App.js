import React from "react"
import {useState, useEffect} from 'react'
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./App.scss"

import Side from "./module/Side"
import Index from "./module/Index"
import Form from "./module/Form"
import Result from "./module/Result"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  //  const { id } = useParams()
  const local_state = (() => {
    try{
      return "" + localStorage["tasks"]
    }catch(e) {return [] }
  })()

  // const [loading ,setLoding ] = useState(true)

  // console.log(loading)
  /*
      localStorageから取り出したい値が単純な数字か文字列の場合、
      JSON.parseする必要はありません・・・
      欲しいのがNumberなら+hogeで数値化し、
      ほしいのがStringならhoge+""で文字列化しましょう。
      localStorageに値が存在しない場合、JSON.parse(undefined)すると
      エラーになるのでtry{}catch(){}で例外処理が必要ですが、
      数値化や文字列化が失敗しても例外にはならないので||で初期値をセットできます。
      この辺はconsoleでたくさん試してみてください。
  */
  const mid = +localStorage["maxId"] || 0
  console.log(mid)

  const [tasks,setTasks] = useState(local_state)
  const [bodys, setBody ] = useState()
  // const result = useRef("")
  const [result, setResult ] = useState()

  // ????????????????
  // 質問 下記で課題一覧を取得する際に上限が100件となっているのですが、
  // 100件以上になった場合はどのように取得したらよいでしょうか？
  // ここで取得しておかないと編集時にデータがとってこれなくなる作りに
  // なっているため、どのようにしたらよいかと思っています。    
  //      
  // ????????????????
  useEffect(() => {
    fetch("https://2012.backlog.jp/api/v2/issues?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT&projectId[]=1073938367&count=100", {
    method: "GET"
    })
    .then(res => res.json())
    .then(json => {
      // console.log(json)
      setBody(json)})

    fetch("https://2012.backlog.jp/api/v2/issues?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT&projectId[]=1073938367", {
    method: "GET"
    })
    .then(res => res.json())
    .then(json => {
      setTasks(json)
    })
    
    
  }, [])

  console.log(tasks)
  console.log(bodys)

  const keys = {
    // id          : "#",
    issueType        : "種別",
    issueKey         : "キー",
    summary          : "件名",
    createdUser      : "担当者",
    status           : "状態",
    priority         : "優先度",
    created          : "登録日",
    startDate        : "開始日",
    dueDate          : "期限日",

  }

  // const nav = useNavigate()
  
  const addTask = (task) => {
    // console.log("add task: ", task)
    // const this_id = mid + 1
    // localStorage["maxId"] = this_id
    
    //// localStorageから読み直し意味がありません。
    // task.id = this_id
    // const added_tasks = [...tasks, ...[task]]

    // localStorage["tasks"] = JSON.stringify(added_tasks)
    // setTasks(added_tasks)
    
    // location.href = `/${task.id}`

    const params = Object.keys(task).map(key => {
      // return (key + "=" + encodeURI(JSON.stringify(task[key])))
      return (key + "=" + encodeURI(task[key]))
    }).join("&")
    fetch(`https://2012.backlog.jp/api/v2/issues?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT&${params}`, {
      method       : "POST",
      headers      : {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    })
    .then(res => {
      if (!res.ok) {
        setResult("タスク登録失敗")
      } else {
        setBody(res.json())
        setResult("タスク登録完了")
      }
    })
  }

  const updateTask = (task) => {
    /*
      万が一存在しないidが指定された場合に例外が起きないように処理する。
    */
    // const target_task_idx = tasks.findIndex(t => +t.id === +task.id)
    // if(target_task_idx === -1) return false
    // tasks[target_task_idx] = task

    // setTasks(tasks)
 

    const editParams = Object.keys(task).map((v , i) => {
      if (v === "issueType"){
        return ("&issueTypeId=" + encodeURI(task[v].id))
      }
      if (["priorityId" ,"summary", "startDate", "dueDate"].includes(v)){
        return ("&" + v + "=" + encodeURI(task[v]))
      }else{
        return ""
      }
    }).join("")

    
    fetch(`https://2012.backlog.jp/api/v2/issues/${task.id}?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT${editParams}`, {
      method       : "PATCH",
      headers      : {
        "Content-Type" : "Content-Type:application/x-www-form-urlencoded"
      }
    })
    .then(res => {
      if (!res.ok){
        setResult("タスク編集失敗")
      }else {
      setResult("タスク編集完了")
      }
    })
  }




  return (
    <div className="App">
      <header className="App-header">
        <p>練習課題 LV.2</p>
      </header>
      <BrowserRouter>
        <Side />
        <Routes>
          <Route path="/" element={  <Index title="テスト" tasks={tasks} keys={keys} bodys={bodys} /> } />
          {/* <Route path="/:id" element={  <Index title="テスト" tasks={tasks} keys={keys} /> } /> */}
          <Route path="/new" element={<Form onClickAddTask={addTask} num={tasks.length} /> } />
          <Route path="/result" element={<Result result={result}/>} />
          <Route path="/:id" element={<Form onClickUpdateTask={updateTask} tasks={tasks} bodys={bodys} /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
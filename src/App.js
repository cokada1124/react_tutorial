import React from "react"
import {useState, useEffect, useRef} from 'react'
import "core-js/stable";
import "regenerator-runtime/runtime";

import "./App.scss"

import Side from "./module/Side"
import Index from "./module/Index"
import Form from "./module/Form"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  //  const { id } = useParams()
  const local_state = (() => {
    try{
      return JSON.parse(localStorage["tasks"])
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

  useEffect(() => {
    fetch("https://2012.backlog.jp/api/v2/issues?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT&projectId[]=1073938367", {
    method: "GET"
    })
    .then(res => res.json())
    .then(json => setBody(json))

    fetch("https://2012.backlog.jp/api/v2/issues?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT&projectId[]=1073938367", {
    method: "GET"
    })
    .then(res => res.json())
    .then(json => setTasks(json))
    // setLoding(false)
  }, [])

  console.log(tasks)

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
    .then(res => res.json())
    .then((json) => {
      setBody(json)
      location.href = `/${json.id}`
    })
  }

  console.log()
  const updateTask = (task) => {
    /*
      万が一存在しないidが指定された場合に例外が起きないように処理する。
    */
    const target_task_idx = tasks.findIndex(t => +t.id === +task.id)
    if(target_task_idx === -1) return false
    tasks[target_task_idx] = task

    //// local_stateをセットしてましたが、それだと更新が反映されません・・・
    // localStorage["tasks"] = JSON.stringify(tasks)

    setTasks(tasks)
 
    const ppp = Object.keys(task).map((v , i) => {
      if (v === "issueType"){
        return ("&issueTypeId=" + encodeURI(task[v].id))
      }
      if(["priorityId" ,"summary", "startDate", "dueDate"].includes(v)){
        return ("&" + v + "=" + encodeURI(task[v]))
      }
    }).join("")
    fetch(`https://2012.backlog.jp/api/v2/issues/${task.id}?apiKey=OT11LGAZyh1sUNrzwYqFXIPSFz5RaNcSFM1Ma1nemzocZU8hOiTzmm8pWMVwiffT${ppp}`, {
      method       : "PATCH",
      headers      : {
        "Content-Type" : "Content-Type:application/x-www-form-urlencoded"
      }
    })
    .then(res => res.json())
    .then((json) => {
      console.log(json)
      // location.href = `/${json.id}`
    
    })
  }



  const hundleSort = (tasks) => {
    setTasks({...tasks})
  }


  // if (loading) {
  //   return (
  //     <div className="loadingimg">
  //     </div>
  //   );
  // }

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
          <Route path="/:id" element={<Form onClickUpdateTask={updateTask} tasks={tasks} bodys={bodys} /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
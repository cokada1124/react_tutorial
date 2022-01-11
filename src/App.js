import React from "react"
import {useState} from 'react'

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

  const keys = {
    id          : "#",
    task        : "種別",
    key         : "キー",
    title       : "件名",
    author      : "担当者",
    status      : "状態",
    priority    : "優先度",
    registed_at : "登録日",
    start_date  : "開始日",
    end_date    : "期限日"
  }
  
  const addTask = (task) => {
    console.log("add task: ", task)
    const this_id = mid + 1
    localStorage["maxId"] = this_id
    
    //// localStorageから読み直し意味がありません。
    task.id = this_id
    const added_tasks = [...tasks, ...[task]]

    localStorage["tasks"] = JSON.stringify(added_tasks)
    setTasks(added_tasks)
    
    console.log(tasks)
    location.href = `/`
  }

  const updateTask = (task) => {
    /*
      万が一存在しないidが指定された場合に例外が起きないように処理する。
    */
    const target_task_idx = tasks.findIndex(t => +t.id === +task.id)
    if(target_task_idx === -1) return false
    tasks[target_task_idx] = task

    //// local_stateをセットしてましたが、それだと更新が反映されません・・・
    localStorage["tasks"] = JSON.stringify(tasks)
    setTasks(tasks)
  }

  const hundleSort = (tasks) => {
    setTasks({...tasks})
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>練習課題 LV.2</p>
      </header>
      <BrowserRouter>
        <Side />
        <Routes>
          <Route path="/" element={  <Index title="テスト" tasks={tasks} keys={keys} /> } />
          {/* <Route path="/:id" element={  <Index title="テスト" tasks={tasks} keys={keys} /> } /> */}
          <Route path="/new" element={<Form onClickAddTask={addTask} num={tasks.length} /> } />
          <Route path="/:id" element={<Form onClickUpdateTask={updateTask} tasks={tasks} /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
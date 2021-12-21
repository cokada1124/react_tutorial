import React from "react"
import {useState} from 'react'

import "./App.scss"

import Side from "./module/Side"
import {Index} from "./module/Index"
import Form from "./module/Form"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  //  const { id } = useParams()
  const local_state = (() => {
    try{
      return JSON.parse(localStorage["tasks"])
    }catch(e) {return [] }
  })()

  const mid = (() => {
    try{
      return JSON.parse(localStorage["maxId"])
    }catch(e) {return 0}
  })()
  console.log(mid)

  let maxId ={
    id: mid,
  }

  const [tasks,setTasks] = useState(
    local_state
  )

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
    maxId.id = maxId.id + 1
    localStorage["maxId"] = JSON.stringify(maxId.id)
    
    task.id = parseInt(localStorage["maxId"])
    setTasks([...tasks, ...[task]])
    localStorage["tasks"] = JSON.stringify([...tasks, ...[task]])
    
    console.log(tasks)
    location.href = `/${task.id}`
  }

  const updateTask = (task,id) => {
     tasks[tasks.findIndex(t => +t.id === +id)] = task
     setTasks(tasks)
     localStorage["tasks"] = JSON.stringify(local_state)
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <BrowserRouter>
        <Side />
        <Routes>
          <Route path="/" element={  <Index title="テスト" tasks={tasks} keys={keys} /> } />
          <Route path="/new" element={<Form onClickAddTask={addTask} num={tasks.length} /> } />
          <Route path="/:id" element={<Form onClickUpdateTask={updateTask} tasks={tasks} /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
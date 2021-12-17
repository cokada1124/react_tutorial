import React from "react"
import {useState} from 'react';

import "./App.scss"

import Side from "./module/Side"
import {Index} from "./module/Index"
import Form from "./module/Form"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  const [tasks,setTasks] = useState([
    {id: "1",task: "タスク", key:"HBR-HOGE-1", title: "summary", author:"fujiwara", status:"対応済", priority:"高", registed_at:"2021-9-1", start_date:"2021-09-01", end_date:"2021-09-01"},
    {id: "2",task: "種別", key:"HBR-HOGE-1", title: "summary", author:"fujiwara", status:"未対応", priority:"高", registed_at:"2021-09-01", start_date:"2021-09-01", end_date:"2021-09-01"}
  ])
  const [keys,setKeys] = useState(
  {
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
  })
  const addTask = () => {
    // const new_tasks = [
    //   ...tasks, 
    //   ...[{kind: 'タスク', key:"HBR-HOGE-1", task_name: "summary", manager:"fujiwara", state:"未対応", primary:"高", registration_date:"2021/9/1", start_date:"2021/9/1", deadline_date:"2021/9/1"}]
    // ]
    const task2 = tasks.concat()
    // [...tasks]
    task2.push({id: "",kind: "タスク", key:"HBR-HOGE-1", task_name: "summary", manager:"fujiwara", state:"未対応", primary:"高", registration_date:"2021/9/1", start_date:"2021/9/1", deadline_date:"2021/9/1"})
    // console.log(task2)
    setTasks(task2)
  }

  const updateTask = (task) => console.log("update task :", task)

    // const addTask(task) => {
    //       const present_tasks = this.state.tasks
    //       this.setState({
    //         tasks: [...present_tasks, task]
    //       })
    // }

  /**
   * 
  const addTasks = () => {
    setTasks(tasks.push({kind: 'タスク', key:"HBR-HOGE-1", task_name: "summary", manager:"fujiwara", state:"未対応", primary:"高", registration_date:"2021/9/1", start_date:"2021/9/1", deadline_date:"2021/9/1"}));
  }
  */


  return (
    <div className="App">
      <header className="App-header">
      </header>
      {/* {JSON.stringify(tasks)} */}
      {/* <button onClick={addTasks}>ボタン</button> */}
      <BrowserRouter>
        <Side />
        <Routes>
          <Route path="/" element={  <Index title="テスト" tasks={tasks} keys={keys} /> } />
          <Route path="/new" element={<Form onClickAddTask={addTask} tasks={tasks} kind={"new"}/> } />
          <Route path="/:id" element={<Form onClickUpdateTask={updateTask} tasks={tasks} kind={"edit"} /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
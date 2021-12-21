import React from "react"
import {useState} from 'react'

import "./App.scss"

import Side from "./module/Side"
import {Index} from "./module/Index"
import Form from "./module/Form"

import { BrowserRouter, Routes, Route , useParams } from "react-router-dom"

function App() {
  const { id } = useParams()
  const [tasks,setTasks] = useState([
    {id: "1",task: "タスク", key:"HBR-HOGE-1", title: "summary", author:"fujiwara", status:"対応済", priority:"高", registed_at:"2021-9-1", start_date:"2021-09-01", end_date:"2021-09-01"},
    {id: "2",task: "種別", key:"HBR-HOGE-1", title: "summary", author:"fujiwara", status:"未対応", priority:"高", registed_at:"2021-09-01", start_date:"2021-09-01", end_date:"2021-09-01"}
  ])
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
  console.log(JSON.parse(localStorage["test2"]))
  const addTask = (task) => {
    // console.log("add task : ", tasks);
    // const task2 = tasks.concat()
    // [...tasks]
    console.log("add task: ", task)
    let id_count = tasks.length;
    console.log(id_count)
    task.id = id_count +1
    //下記ifの条件文に”submitボタンが押されたら”という条件をいれたいのですが、これもステートで状態を持つのがよいでしょうか？
    
    tasks.push(task)
    // localStorage["tasks"] = JSON.stringify(tasks)
    
    console.log(tasks)
    // console.log(task2)
    // setTasks(task2)
  }

  const updateTask = (task) => {
    // const edit_task = tasks.find(task => task.id === id);
    tasks[task.id - 1] = task
    // localStorage["tasks"] = JSON.stringify(tasks)
    // console.log(id)

    // tasks.map((t, i) => {
    //   Object.keys(t).map((key, j) => {
    //     if(t[id]===task.id){
    //       t=task;
    //     }
    //   })
    // })
    //  tasks.find((task) => task.id === tasks.id)
    // console.log(task.id);
  //  console.log("update task :", task);
  //  console.log(edit_task)
   
  }
    
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
          <Route path="/new" element={<Form onClickAddTask={addTask} /> } />
          <Route path="/:id" element={<Form onClickUpdateTask={updateTask} tasks={tasks} /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
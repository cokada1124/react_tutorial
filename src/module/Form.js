import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const Form = (props) => {
  const { id } = useParams()
  const [ state, setState ] = useState({
    id          : 0,
    task        : 0,
    key         : "",
    title       : "",
    author      : "",
    status      : "",
    priority    : "",
    registed_at : "",
    start_date  : "",
    end_date    : ""
  })

  const selects = {
    task     : ["タスク", "検証", "議事録"],
    author   : ["minamoto", "taira", "soga", "fujiwara"],
    status   : ["未対応", "対応済"],
    priority : ["高", "中", "低"]
  }

  const title = id === undefined ? "課題追加" : "課題編集"
  const submit_label = id === undefined ? "追加" : "更新"

  useEffect(() => {
    // console.log("useEffect", id)
    const this_task = id === undefined ? null : props.tasks.find(task => task.id === id)
    if(this_task !== null) {
      setState({...this_task})
    }
  }, [props.tasks])
  
  console.log(state)

  const generateOpt = (key) => {
    // console.log("gen opt: ", selects[key])
    return selects[key].map((opt, i) => (
      <option key={`${key}_${i}`} value={opt}>{opt}</option>
    ))
  }

  const createOrUpdateTask = props.onClickAddTask || props.onClickUpdateTask
  
  return (
    <div className="main_container fl-right m-top-5">
      <h2>{title}</h2>
      
      <ul className="FormList">
        <li><label>id</label>{id}</li>

        <li>
          <label>task</label>
          <select onChange={(e)=>setState({...state, ...{task: e.target.value}})} value={state.task}>
          {generateOpt("task")}
          </select>
        </li>
        
        <li>
          <label>key</label>
          <input type="text" value={state.key} onChange={(e) => setState({...state, ...{key: e.target.value}})} />
        </li>
        
        <li>
          <label>title</label>
          <input type="text" value={state.title} onChange={(e) => setState({...state, ...{title: e.target.value}})} />
        </li>
        
        <li>
          <label>author</label>
          <select onChange={(e)=>setState({...state, ...{author: e.target.value}})} value={state.author}>
          {generateOpt("author")}
          </select>
        </li>
        
        <li>
          <label>status</label>
          <select onChange={(e)=>setState({...state, ...{status: e.target.value}})} value={state.status}>
          {generateOpt("status")}
          </select>
        </li>
        
        <li>
          <label>priority</label>
          <select onChange={(e)=>setState({...state, ...{priority: e.target.value}})} value={state.priority}>
          {generateOpt("priority")}
          </select>
        </li>
        
        <li>
          <label>registed_at</label>
          <input type="date" value={state.registed_at} onChange={(e) => setState({...state, ...{registed_at: e.target.value}})} />
        </li>
        
        <li>
          <label>start_date</label>
          <input type="date" value={state.start_date} onChange={(e) => setState({...state, ...{start_date: e.target.value}})} />
        </li>
        
        <li>
          <label>end_date</label>
          <input type="date" value={state.end_date} onChange={(e) => setState({...state, ...{end_date: e.target.value}})} />
        </li>
      </ul>
      
      <div>
        <button onClick={() => createOrUpdateTask()}>{submit_label}</button>
      </div>
    </div>
  )
}

export default Form
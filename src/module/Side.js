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
        <a href="/" className={tasksList}>{title_1}</a>
      </li>
      <li>
        <a href="/new" className={addTasks}>{title_2}</a>
      </li>
    </ul>
  )
  }

export default Side
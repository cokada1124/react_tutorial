import React, { useState, useRef }  from "react"
import { Link } from "react-router-dom"

const Index = (props) => {
  const tasksPerPage = 5

  const [ tasks, setState ] = useState(props.tasks)
  const [ sortstate, setSortState ] = useState(true)
  const search_p = (() => {try{return +location.search.match(/p\=(\d+)/)[1]}catch(e){return 1}})()
  const currentPage = useRef(search_p)
  const getPosition = (page) => [(page * tasksPerPage) - tasksPerPage, page * tasksPerPage]
  const position = getPosition(currentPage.current)
  const [ currentTasks , setCurrentTasks ] = useState(tasks.slice(position[0], position[1]))

  const ths = Object.keys(props.keys).map((key, i) => (
    <th key={`th_${i}`} onClick={()=>tasksSort(key)}>{props.keys[key]}</th>
  ))

  const tasksSort = (key) => {
    if(sortstate){
    const desctasks = tasks.sort((a, b) => (a[key] < b[key]) ? 1 : -1)
    setSortState(!sortstate)
    setState([...desctasks])
    console.log(!sortstate)
    }else{
      const asctasks = tasks.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
      setSortState(!sortstate)
      setState([...asctasks])
    }
  }



  const pageOflastTask = currentPage * tasksPerPage
  const pageOffarstTask = pageOflastTask - tasksPerPage 

  console.log(pageOflastTask)
  console.log(pageOffarstTask)

  const pageNumber = [];

  for(let i = 1; i <= Math.ceil(tasks.length / tasksPerPage); i++){
    pageNumber.push(i)
    console.log(i)
  }
  
  const trs = currentTasks.map((task, i) => {
    const tds = Object.keys(task).map((td, j) => (
      <td key={`td_${j}`}>{task[td]}</td>
    ))
    const toEdit = (id) => {
      location.href = "/" + id
    }

    return (
      <tr key={`tr_${i}`} onClick ={()=>toEdit(task.id)}>
        {tds}
      </tr>
    )
  })

  const numtd = pageNumber.map((v,i) => (
    <td key={`pn_td_${i}`} onClick={()=>hundlePagenate(v)}><span className="main_container__table_pagenum--num"><Link to={`/?p=${v}`}>{v}</Link></span></td>
  ))


  const hundlePagenate = (v) => {
    currentPage.current = v
    const cp = v
    localStorage["currentPage"] = cp

    const position = getPosition(v)
    const currentT = tasks.slice(position[0], position[1])

    changeCurrentTasks(currentT)
  }

  const changeCurrentTasks = (tasks) => {
    setCurrentTasks([...tasks])
    localStorage["currentTasks"] = JSON.stringify(tasks)
    console.log(JSON.parse(localStorage["currentTasks"]))
  }

  return(
    <div className="main_container">
    <table className="main_container__table_pagenum">
      <tbody>
        <tr>
          <td>{position[0] + 1}〜{position[1]}件</td>
          {numtd}
          <td className="main_container__table_pagenum--text" onClick={()=>hundlePagenate(+localStorage["currentPage"]+1)}>次へ</td>
        </tr>
      </tbody>
    </table>
    <table className="main_container__table_tasks">
    <thead>
          <tr>
            {ths}
          </tr>
        </thead>
        <tbody>
          {trs}
        </tbody>
        </table>
    <table className="main_container__table_pagenum">
      <tbody>
        <tr>
          <td>{position[0] + 1}〜{position[1]}件</td>
          {numtd}
          <td className="main_container__table_pagenum--text" onClick={()=>hundlePagenate(+localStorage["currentPage"]+1)}>次へ</td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}

export default Index
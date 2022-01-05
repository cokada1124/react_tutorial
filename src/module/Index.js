import React, { useState, useRef}  from "react"
import { useParams, Link, useLocation } from "react-router-dom"

const Index = (props) => {
  const { id } = useParams()

  const tasksPerPage = 5
  const [ tasks, setState ] = useState(props.tasks)
  const [ sortstate, setSortState ] = useState(true)

  /* ?
   *  const search_pに代入されている関数の中で、[1]がどのような意味であるかわからず、
      ご教授いただければ幸いです。
   */
  const search_p = (() => {try{return +location.search.match(/p\=(\d+)/)[1]}catch(e){return 1}})()
  const currentPage = useRef(search_p)
  const getPosition = (page) => [(page * tasksPerPage) - tasksPerPage, page * tasksPerPage]
  const position = getPosition(currentPage.current)
  const [ currentTasks , setCurrentTasks ] = useState(tasks.slice(position[0], position[1]))

  
  const ths = Object.keys(props.keys).map((key, i) => (
    <th key={`th_${i}`} onClick={()=>tasksSort(key)}><Link to={`/`}>{props.keys[key]}</Link></th>
  ))
  console.log(ths)
  console.log(props.tasks)
  // console.log(tasks.tasks)
  console.log(props)

  const tasksSort = (key) => {
    if(sortstate){
    const desctasks = tasks.sort((a, b) => (a[key] < b[key]) ? 1 : -1)
    setSortState(!sortstate)
    setState([...desctasks])
    console.log(!sortstate)
    const desccurrenttasks = currentTasks.sort((a, b) => (a[key] < b[key]) ? 1 : -1)
    setCurrentTasks(desccurrenttasks)

  }else{
    const asctasks = tasks.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
    setSortState(!sortstate)
    setState([...asctasks])
    const asccurrenttasks = currentTasks.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
    setCurrentTasks(asccurrenttasks)
  }
    
  }

  // const location = useLocation();

  // console.log(location.search)

  // if(location.search === "?p=" + currentPage){
    
  // }
  // if(location.search.charAt(0) !== "?" ){
  //   const pageOflastTask = 1 * tasksPerPage
  //   const pageOffarstTask = pageOflastTask - tasksPerPage 

  //   const currentT = tasks.slice(pageOffarstTask, pageOflastTask)
  //   localStorage["currentTage"] = currentT
  //   console.log(currentT)
  // }


  const pageOflastTask = currentPage * tasksPerPage
  const pageOffarstTask = pageOflastTask - tasksPerPage 

  console.log(pageOflastTask)
  console.log(pageOffarstTask)

  // const currentT = tasks.slice(pageOffarstTask, pageOflastTask)

  
  console.log(id)
  console.log(tasks)

  // (() => {
  //   setState([...currentTasks]) 
  // })();

  const pageNumber = [];

  for(let i = 1; i <= Math.ceil(tasks.length / tasksPerPage); i++){
    pageNumber.push(i)
    console.log(i)
  }
  // tasks.map((v,i) => pageNumber.push(i) )
  console.log(pageNumber)

  // console.log(pageNumber)

  
  
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
    // <td key={`pn_td_${i}`} onClick={()=>hundlePagenate(v)}><span className="main_container__table_pagenum--num"><Link to={`/?${v}`}>{v}</Link></span></td>
    <td key={`pn_td_${i}`} onClick={()=>hundlePagenate(v)}><span className="main_container__table_pagenum--num"><Link to={`/?p=${v}`}>{v}</Link></span></td>
  ))

  const location = useLocation();

  const hundlePagenate = (v) => {
    // setPagenateState({currentPage : v})
    // location.href = `/?${v}`
    // setCurrentPage(v)
    // console.log(v)
    const cp = v
    localStorage["currentPage"] = cp
    console.log(localStorage["currentPage"])
    // const pageOflastTask = currentPage * tasksPerPage
    // const pageOffarstTask = pageOflastTask - tasksPerPage 
    // const currentTasks = tasks.slice(pageOffarstTask, pageOflastTask)
    // console.log(currentTasks)
    // console.log(pageOffarstTask)
    // console.log(pageOflastTask)
    // setState([...currentTasks]) 
    // changeCurrentTasks(currentT)
    
    // const aaa = currentTasks
    // if(llocation.search === "?p=" + v){
    //   console.log("testtest")
    // }
    // console.log(location)
  
  // console.log(pageOflastTask)
  // console.log(pageOffarstTask)

  // location.href = `/?${v}`

  const position = getPosition(v)
  const currentT = tasks.slice(position[0], position[1])
  changeCurrentTasks(currentT)
    
    

  // console.log(location.search)
  // setCurrentTasks(currentT)
  // window.location.replace( `/?${v}`) ;
  }
  // console.log()
  // console.log(tasks)
  // console.log(currentTasks)

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
import React, { useState}  from "react"

const Index = (props) => {

  const [ tasks, setState ] = useState(props.tasks)

  const [ sortstate, setSortState ] = useState(true)

  const [ currentPage, setCurrentPage] = useState(1)

  const tasksPerPage = 5

  const ths = Object.keys(props.keys).map((key, i) => (
    <th key={`th_${i}`} onClick={()=>tasksSort(key)}>{props.keys[key]}</th>
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
  }else{
    const asctasks = tasks.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
    setSortState(!sortstate)
    setState([...asctasks])
  }

    // console.log(desctasks)
    // props.onClickHundleSort(stasks)
    
  }
  // if(state.tasks.length > 5 && state.tasks.length < 11){
  // }
  

  const pageOflastTask = currentPage * tasksPerPage
  const pageOffarstTask = pageOflastTask - tasksPerPage 

  console.log(pageOflastTask)
  console.log(pageOffarstTask)

  const currentTasks = tasks.slice(pageOffarstTask, pageOflastTask)

  console.log(currentTasks)

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
    <td onClick={()=>hundlePagenate(v)}>{v}</td>
  ))

  const hundlePagenate = (v) => {
    // setPagenateState({currentPage : v})
    setCurrentPage(v)
    // console.log(currentTasks)
    // setState([currentTasks])    

  }
  // console.log()

  return(
    <div className="main_container">
    <table className="fl-right m-top-15">
    <thead>
          <tr>
            {ths}
          </tr>
        </thead>
        <tbody>
          {trs}
        </tbody>
        </table>
    <table>
      <tbody>
        <tr>
          {numtd}
        </tr>
      </tbody>
    </table>
    </div>
  )
}

export default Index
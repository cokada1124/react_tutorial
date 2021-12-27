import React, { useState}  from "react"

const Index = (props) => {

  const [ state, setState ] = useState({
    tasks: props.tasks
  })

  const [ sortstate, setSortState ] = useState({
    sortstate: true
  })

  const [ pagenatestatte, setPagenateState] = useState({
    currentPage: 1,
    tasksPerPage: 5
  })

  const ths = Object.keys(props.keys).map((key, i) => (
    <th key={`th_${i}`} onClick={()=>tasksSort(key)}>{props.keys[key]}</th>
  ))
  console.log(ths)
  console.log(props.tasks)
  console.log(state.tasks)
  console.log(props)

  const tasksSort = (key) => {
    if(sortstate){
    const asctasks = state.tasks.sort((a, b) => (a[key] < b[key]) ? 1 : -1)
    setSortState(!sortstate)
    setState({tasks:asctasks})
  }else{
    const descstasks = state.tasks.sort((a, b) => (a[key] > b[key]) ? 1 : -1)
    setSortState(!sortstate)
    setState({tasks:descstasks})
  }

    console.log("")
    // props.onClickHundleSort(stasks)
    
  }
  // if(state.tasks.length > 5 && state.tasks.length < 11){
  // }
  

  const trs = state.tasks.map((task, i) => {
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
    </div>
  )
}

export default Index
import React from "react"

function Index(props) {
  const { column_names, tasks } = props

  const ths = Object.keys(column_names).map((key, i) => {
    return (<th key={`th_${i}`}>{column_names[key]}</th>)
  })

  
  const trs = tasks.map((task, i) => {
    const tds = Object.keys(task).map((td, j) => {
      return (<td key={`td_${j}`}>{task[td]}</td>)
    })
    const toEdit = (id) => {
      location.href = "/" + id
    }

    return (
      <tr key={`tr_${i}`} onClick={()=>toEdit(task.id)}>
        {tds}
      </tr>
    )
  })
  console.log(ths);
  ths.forEach(th => {
    console.log(th.props.children)
  })
  // console.log(trs);

  return(
    <div>
      <table>
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
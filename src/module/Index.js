import React from "react"

function Index(props) {
  const { column_names, tasks } = props

  const ths = Object.keys(column_names).map((key, i) => (
    <th key={`th_${i}`}>{column_names[key]}</th>
  ))

  const trs = tasks.map((task, i) => {
    const tds = Object.keys(task).map((td, j) => (
      <td key={`td_${j}`}>{task[td]}</td>
    ))

    return (
      <tr key={`tr_${i}`}>
        {tds}
      </tr>
    )
  })

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
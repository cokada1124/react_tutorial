import React from "react"

export class Index extends React.Component{
  constructor(props){
    super(props);
  }
  render(){


    const ths = Object.keys(this.props.keys).map((key, i) => (
      <th key={`th_${i}`}>{this.props.keys[key]}</th>
    ))

    console.log(this.props.tasks)


  
    const trs = this.props.tasks.map((task, i) => {
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
}
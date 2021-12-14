import React from "react"

export class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      a: "test", 
    }
  }

  render() {
    const { title } = this.props
    const local = (() => {
      try{
        return JSON.parse(localStorage["this_test"])
      }catch(e) {return null }
    })()

    return (
      <table className="fl-right">
        <tbody><tr>
          <td>{title}</td>
          <td>{title}</td>
          <td>{title}</td>
          <td>{title}</td>
          <td>{ local }</td>
        </tr></tbody>
      </table>
      
      // {
      //   for (var i = 0, length = localStorage.length; i < length; ++i) {
      //     console.log(localStorage.key(i));
      //   }
      // }
      
    )
  }
}
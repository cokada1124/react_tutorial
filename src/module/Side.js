import React from "react"

import { Link } from "react-router-dom"

class Side extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title_1 : "課題一覧",
      title_2 : "課題追加",
      toggle  : false
    }
  }

  render() {
    return (
      <ul className="side-bar__ul">
        <li>
      <a href="/">{this.state.title_1}</a>
      </li>
      <li>
      <a href="/new">{this.state.title_2}</a>
      </li>
      </ul>
    )
  }
}

export default Side
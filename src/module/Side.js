import React from "react"

import { Link } from "react-router-dom"

const Side = (props) => {
    return (
      <aside>
        <ul className="li-st-none f-24">
          <li><Link to="/">課題一覧</Link></li>
          <li><a href="/new">課題追加</a></li>
        </ul>
      </aside>
    )
}

export default Side
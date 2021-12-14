import React from 'react';

import { Link } from 'react-router-dom';

class Side extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      title_1: "課題一覧",
      title_2: "課題追加",
      toggle: false
    }
  }
  render(){
    return(
      <ul className="li-st-none f-24">
        <li>
      <Link to={`/new`}>{this.state.title_1}</Link>
      {/* <a href="/new">{this.state.title_1}</a> */}
      {/* <a href="/" className={this.state.toggle ? "on" : ""} onClisk={() => this.setState(toggle: !)}</a> */}
      </li>
      <li>
      <a href="/">{this.state.title_2}</a>
      </li>
      </ul>
    )
  }
}

export default Side;


// import React from 'react';

// const Menu = () => {
//     return <p>This is Person Component.</p>
// };

// export default Menu;
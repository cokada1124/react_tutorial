import React from 'react';

class Menu extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      title: "課題一覧"
    }
  }
  render(){
    return(
      <h2>
      {this.state.title}
      </h2>
    )
  }
}

export default Menu;


// import React from 'react';

// const Menu = () => {
//     return <p>This is Person Component.</p>
// };

// export default Menu;
import React from 'react';

export class Index extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      a: "test", 
    }

  }
  render(){
    const {title} = this.props;
    return(
      <table className="fl-right">
        <tr>
          <td>{title}</td>
          <td>{title}</td>
          <td>{title}</td>
          <td>{title}</td>
          <td>{JSON.parse(localStorage["this_test"])}</td>
        </tr>
      </table>
      
      {
        for (var i = 0, length = localStorage.length; i < length; ++i) {
          console.log(localStorage.key(i));
        }
      }
      
    )
  }
}
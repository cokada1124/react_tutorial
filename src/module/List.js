import React from 'react';

export class List extends React.Component{
  // constructor(props){
  //   super(props);
  //   this.state ={
  //   }
  // }
  render(){
    const {title} = this.props;
    return(
      <table className="f-right">
        <tr>
          <td>{title}</td>
          <td>{title}</td>
          <td>{title}</td>
          <td>{title}</td>
          <td>{title}</td>
        </tr>
      </table>
    )
  }
}
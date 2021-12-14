import React from 'react';

export class Index extends React.Component{
  // constructor(props){
  //   super(props);
  //   this.state ={
  //   }
  // }
  render(){
    const {title} = this.props;
    return(
      <table className="fl-right">
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
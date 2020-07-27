import React from 'react';

const Table = ({tableData}) =>{
  const tableHeader = Object.keys(tableData[0]);
  return <table className=" " border="1" style={{ marginTop: 20 }} >
    <thead className="">
    <tr>
      {tableHeader.map(thValue => <th key={thValue} scope="col">{thValue}</th>)}      
    </tr>
  </thead>
  <tbody>
    {tableData.map(tbodyValue => <tr key={tbodyValue.variable}>
      <td>{tbodyValue.Name}</td>
      <td>{tbodyValue.Equation}</td>
      <td>{tbodyValue.Value}</td>
    </tr>)}      
  </tbody>
</table>
}


export default Table
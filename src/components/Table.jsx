import React from 'react';

const Table = ({tableData}) =>{
  const tableHeader = Object.keys(tableData[0]);
  return <table className=" " border="1" style={{ marginTop: 20 }} >
    <thead className="">
    <tr>
      {/* {tableHeader.map(thValue => <th key={thValue} scope="col">{thValue}</th>)}       */}
      <th>Variable</th>
      <th>Equation</th>
      <th>Evaluated Result</th>
    </tr>
  </thead>
  <tbody>
    {tableData.map(tbodyValue => <tr key={tbodyValue.variable}>
      <td>{tbodyValue.name}</td>
      <td>{tbodyValue.equation}</td>
      <td>{tbodyValue.value}</td>
    </tr>)}      
  </tbody>
</table>
}


export default Table
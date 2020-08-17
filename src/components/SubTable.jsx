import React from 'react';

const SubTable = ({ tableData }) => {
    const tableHeader = Object.keys(tableData[0]);
    console.log('tableheader', tableHeader)
    return <table className=" " border="1" style={{ marginTop: 20 }} >
        <thead className="">
            <tr>
                {/* {tableHeader.map(thValue => <th key={thValue} style={{background: "white",position: "sticky", top: 0,zIndex: 10}} scope="col">{thValue}</th>)} */}
            <th>Control Variable</th>
            <th>Values</th>
            </tr>
        </thead>
        <tbody>
            {tableData.map(tbodyValue => <tr key={tbodyValue}>
                <td>{tbodyValue.control_variable}</td>
                <td>{tbodyValue.Value}</td>
            </tr>)}
        </tbody>
    </table>
}


export default SubTable
import React from 'react';
//import MultiSelect from "react-multi-select-component";
const jsonData = require('../components/dummyjson.json')



const MultiSelector =  (props) => {
    return (
        <div className="dropdown">
            <i class="fa fa-filter fa-lg" aria-hidden="true"></i>
            <button className="dropdown-toggle" data-toggle="dropdown" onClick={props.onStoreChange} >FilterBy:Price Code</button>
            
            <ul className="dropdown-menu" style={{ display:  props.showStore ? 'block' : 'none' } } >
                <input id="SearchBar"  onChange={props.sreachText} placeholder="search here" style={{ width: "100%" }}></input><li><input type="checkbox" className="selectALL" onClick={props.selectAllClicked} checked={props.selected}></input>Select All</li> 
                {props.selectedPC.map(val => <li key={val}>{props.selectAllClickedbtn === true ? <input type="checkbox" name="codeCheckAll" textname={val} className="codeCheckSingle" value={val} checked="checked" onChange={props.InputChange} ></input> : <input type="checkbox" name="codeCheckAll" textname={val} className="codeCheckSingle" value={val} onChange={props.InputChange} ></input>}
                    {val}</li>)}
                <button style={{marginLeft:'20px', width:'80px'}} onClick={props.okBtnClicked}>ok</button>
            </ul>            
        </div>
    );
};

export default MultiSelector;
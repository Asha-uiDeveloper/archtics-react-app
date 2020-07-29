import React, { useState } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import SubTable from '../components/SubTable';
import MultiSelector from '../Pages/CheckBox';
import { ajax } from 'jquery';
const jsonData = require('./dummyjson.json')



class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            tableData: [],
            Base_price: null,
            Decision_makers: null,
            rules: [],
            showStore: false,
            selectAll: false,
            priceCodesList: [],
            filteredData: [],
            CheckBoxList: [],
            basePriceCodeData:[]
        };

    //    this.handleChange = this.handleChange.bind(this);

    }

    handleNetworkCall = () =>{
        const PRICE_URL = `https://dev.pricemaster.ticketmaster.com/admin/basePriceCode?user=messina@msp&sid=1AD095FBD9DA46DBBDB0A62B4E0D7E2E`
        axios.get(PRICE_URL, {
         params: {
                "eventId": "105042"
         }
        }, {
                headers: { "Access-Control-Allow-Origin": "*" }
            }
        )
            .then(response => {
                if(response.status === 200){
                    const basePriceCodeData = response.data.result.data.rules;
                    console.log('basePriceCodeData', basePriceCodeData);
                    let priceCodesList = [].concat.apply([], basePriceCodeData.map(values =>
                        values.base_pricecode));
                    let filteredData = [].concat.apply([], priceCodesList);
                    console.log(priceCodesList, filteredData);
                    this.setState({
                        priceCodesList, filteredData, basePriceCodeData
                    })
                }
            })
            .catch(error =>console.log("error", error))
    }

    componentDidMount() {
        this.handleNetworkCall();        
    }

    // handleChange(event) {
    //     const  Rules  = this.state.basePriceCodeData;
    //     Rules.map(rule =>
    //         rule.Price_Codes.map(code => {
    //             if (code === event) {
    //                 this.setState({ rules: rule });
    //             }
    //         }))
    // }

    // handleClick() {
    //     //   alert('Your favorite flavor is: ' + this.state.value);
    //     console.log("clicked");
    // }

    handleToggle = () => {

        this.setState({ showStore: !this.state.showStore });

    }
    handleSelectAll = () => {

        this.setState({ selectAll: !this.state.selectAll });
        if (!this.state.selectAll === true) {
            this.setState({ CheckBoxList: this.state.priceCodesList });
        } else {
            this.setState({ CheckBoxList: [] });
        }

    }
    handleSearch = (event) => {

        const filteredData = this.state.priceCodesList.filter(val => {
            return val.toLowerCase().includes(event.target.value)
        })
        if (event.target.value === "") {
            this.setState({ filteredData: this.state.priceCodesList });
        } else {
            this.setState({ filteredData });
        }
    }

    handleOkBtn = (event) => {
        this.handleToggle();
        const Rules = this.state.basePriceCodeData
        let filteredRule = [];
        this.state.CheckBoxList.map(val =>
            Rules.map(rule => {
                    if (rule.base_pricecode === val) {
                        filteredRule.push(rule);
                    }
                }));
        this.setState({ rules: filteredRule });
        // this.setState({ rules: rule });
    }
    handleInputChange = (event) => {
        const target = event.target;
        var value = target.value;
        var array = [...this.state.CheckBoxList]; // make a separate copy of the array
        if (target.checked) {
            this.state.CheckBoxList.push(value);
        } else {
            this.setState({selectAll: false});
            var index = array.indexOf(value)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({ CheckBoxList: array });
            }
        }
    }

    render() {
        const  Rules  = this.state.basePriceCodeData
        const { tableData } = this.state;
        const { Base_price } = this.state;
        const { Decision_makers } = this.state;
        const { rules, filteredData } = this.state;
        console.log('Rules', rules);
        return (
            <div>
                <MultiSelector sreachText={this.handleSearch} InputChange={this.handleInputChange} onStoreChange={this.handleToggle} okBtnClicked={this.handleOkBtn} showStore={this.state.showStore} selectAllClickedbtn={this.state.selectAll} selectAllClicked={this.handleSelectAll} selectedPC={this.state.filteredData} />
                <form >
                    {/* <label>
                        Filter By:
                    <select value={this.state.value} onChange={this.handleChange} >
                            <option>Price Codes</option>
                            {jsonData.tabledata.Rules.map(values =>
                                values.Price_Codes.map(val => <option key={val}>
                                    {val}</option>))}
                        </select>
                    </label> */}
                    {/* <MultiSelector /> */}
                    {rules.length === 0 ?
                        <div className='row'>
                            {this.state.basePriceCodeData.map(rule =>
                             {
                                                return <>
                                                  
                                                    {rule.base_pricecode === null ? 
                                                        <div className="col-12"><div style={{ marginTop: 30 }}>Base_Price_Code:</div>{this.state.basePriceCodeData[0].Base_Price_Code}</div> : <div className="col-12"><div style={{ marginTop: 30 }}>Base_Price_Code:   <span class="badge badge-secondary">{rule.base_pricecode}</span><i style={{ fontSize: 18, marginLeft: 640 }} class="fa" data-toggle="tooltip" title={`DERIVED = ${rule.derived} New_Host_Price = ${rule.new_host_price}`}>&#xf05a;</i></div>
                                                         </div>}
                                                    {/* <div className="col-2"> <table className="" border="1" style={{ marginTop: 20 }} >
                                                        <thead className="">
                                                            <tr>
                                                                <th>Price Codes</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {rule.Price_Codes.map(tbodyValue => <tr key={tbodyValue}>
                                                                <td>{tbodyValue}</td>

                                                            </tr>)}
                                                        </tbody>
                                                    </table></div> */}
                                                    {rule.variables.length !== 0 ?
                                                        <div className="col-5">
                                                            <Table tableData={rule.variables} />
                                                        </div>
                                                        :
                                                        <div className="col-5">
                                                            <Table tableData={this.state.basePriceCodeData[0].variables} />
                                                        </div>
                                                    }
                                                    <div className="col-5">
                                                        {rule.decision_makers === null ? < SubTable tableData={this.state.basePriceCodeData[0]["decision_makers"]} /> : <SubTable tableData={rule.decision_makers} />}
                                                    </div>
                                                </>
                                            }
                                        )}

                        </div> :  
                        rules.map(rule => 
                                    <div className="row">
                                        <div className="col-12">
                                            <div style={{ marginTop: 30 }}>Base_Price_Code:
                                    <span class="badge badge-secondary">{rule.base_pricecode}</span><i style={{ fontSize: 18, marginLeft: 640 }} class="fa" data-toggle="tooltip" title={`DERIVED = ${rule.derived} New_Host_Price = ${rule.new_host_price}`}>&#xf05a;</i>
                                            </div>
                                    
                                        </div>
                                        {/* <div className="col-2 ">
                                    <table className="" border="1" style={{ marginTop: 20 }} >
                                                <thead className="">
                                                    <tr>
                                                        <th>Price Codes</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                        {rule.Price_Codes.map(code => <tr key={code}>
                                                            <td>{code}</td>
                                                        </tr>)}
                                                </tbody>
                                            </table>
                                        </div> */}
                                        <div className='col-6 '>
                                            <Table tableData={rule.variables} />
                                        </div>
                                        <div className="col-4">
                                            < SubTable tableData={rule.decision_makers} />
                                        </div>
                                    </div>
                                )
                    }
                </form>
            </div>
        );
    }
}
export default DropDown;
import React, { useState } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import SubTable from '../components/SubTable';
import MultiSelector from '../Pages/CheckBox';
import { ajax } from 'jquery';
const jsonData = require('./dummyjson.json')



class PriceCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            tableData: [],
            Base_price: null,
            decision_makers: null,
            rules: [],
            showStore: false,
            selectAll: true,
            priceCodesList: [],
            filteredData: [],
            CheckBoxList: [],
            priceCodeData :[],
            price :null,
            derived:null,
            selected: true
        };

       // this.handleChange = this.handleChange.bind(this);

    }

    handleNetworkCall = () => {
        const PRICE_URL = `https://dev.pricemaster.ticketmaster.com/admin/priceCode?user=ducks@msp&sid=C5760FE13E6D4BDEA8FA0F32E4F1B9F5`
        axios.get(PRICE_URL, {
            params: {
                "eventId": "105042"
            }

        },
            {
                headers: { "Access-Control-Allow-Origin": "*" }
            }
        )
            .then(response =>  {
            if (response.status === 200) {
                const priceCodeData = response.data.result.data.rules;
                const price = response.data.result.data.price;
                const derived = response.data.result.data.derived;
                console.log('priceCodeData', priceCodeData);
                let priceCodesList = [].concat.apply([], priceCodeData.map(values =>
                    values.pricecodes));
                let filteredData = [].concat.apply([], priceCodesList);
                console.log(priceCodesList, filteredData);
                priceCodesList.sort();
                filteredData.sort();
                this.setState({
                    priceCodesList, filteredData, priceCodeData,price,derived
                })
            }
        })
            .catch(error => console.log("error", error))
    }

    componentDidMount() {
        this.handleNetworkCall("1232");
        // let priceCodesList = [].concat.apply([], jsonData.tabledata.Rules.map(values =>
        //     values.pricecodes));
        // let filteredData = [].concat.apply([], priceCodesList);
        // console.log(priceCodesList, filteredData);
        // this.setState({
        //     priceCodesList, filteredData
        // })
    }

    // handleChange(event) {
    //     const { Rules } = this.state.priceCodeData;
    //     Rules.map(rule =>
    //         rule.pricecodes.map(code => {
    //             if (code === event) {
    //                 this.setState({ rules: rule });
    //             }
    //         }))

    //     // for (var i = 0; i < jsonData.tabledata.Rules.length; i++) {
    //     //     if (jsonData.tabledata.Rules[i].Price_Codes.indexOf(event.target.value) !== -1) {
    //     //         console.log(jsonData.tabledata.Rules[i].Variables);
    //     //         console.log(jsonData.tabledata.Rules[i]["Decision Makers"]);
    //     //         console.log(jsonData.tabledata.Rules[i]["Base Price Code"]);
    //     //     }

    //     // }
    // }

    // handlebgColor = () => {
    //      CheckBoxList.map(val => val === code) ? 'green' : ''
    // }

    handleClick() {
        //   alert('Your favorite flavor is: ' + this.state.value);
        console.log("clicked");
    }

    handleToggle = () => {

        this.setState({ showStore: !this.state.showStore });

    }
    handleSelectAll = () => {
        this.setState({ selectAll: !this.state.selectAll });
        if (!this.state.selectAll === true) {
            this.state.selected = true;
            this.setState({ CheckBoxList: this.state.priceCodesList });
        } else {
            this.state.selected = false;
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

        //   console.log(filteredData);
    }
    handleOkBtn = (event) => {
        this.handleToggle();
        const  Rules  = this.state.priceCodeData;
        let filteredRule = [];
        let bp=[];
        this.state.CheckBoxList.map(val =>
            Rules.map(rule =>
                rule.pricecodes.map(code => {
                    if (code === val) {  
                        bp.push(rule.base_pricecode);
                    }
                })));
            console.log("bp>>>>", bp);
      bp= [... new Set(bp)]
      bp.map(code=> 
        Rules.map(rule =>{
            if(rule.base_pricecode === code){
                filteredRule.push(rule);
            }
        }
             )
        )
        console.log("filteredRule", filteredRule);
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
            this.setState({ selectAll: false });
            var index = array.indexOf(value)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({ CheckBoxList: array });
            }
        }
    }

    render() {
      //  const { Rules } = jsonData.tabledata;
        const Rules = this.state.priceCodeData
        const { tableData } = this.state;
        const { Base_price } = this.state;
        const { Decision_makers } = this.state;
        const { rules, filteredData } = this.state;
        const {CheckBoxList} =this.state;
        console.log('Rules', rules);
        return (
            <div>
                <MultiSelector sreachText={this.handleSearch} InputChange={this.handleInputChange} onStoreChange={this.handleToggle} okBtnClicked={this.handleOkBtn} showStore={this.state.showStore} selectAllClickedbtn={this.state.selectAll} selectAllClicked={this.handleSelectAll} selectedPC={this.state.filteredData} selected={this.state.selected} />
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
                            {this.state.priceCodeData.map(rule =>
                                {                                                                                   
                                    return <>

                                                    {rule.base_pricecode === null ?
                                            <div className="col-12"><div style={{ marginTop: 30 }}>Pattern:</div>{jsonData.tabledata.Rules[0].base_pricecode}</div> : <div className="col-12"><div style={{ marginTop: 30 }}>Pattern:   <span class="badge badge-secondary">{rule.base_pricecode}</span><i style={{ fontSize: 18, marginLeft: 630 }} class="fa" data-toggle="tooltip" title={`DERIVED = ${this.state.derived} New_Host_Price = ${this.state.price}`}>&#xf05a;</i></div>
                                                        </div>}
                                                    <div className="col-2"> <table className="" border="1" style={{ marginTop: 20 }} >
                                                        <thead className="">
                                                            <tr>
                                                                <th>Price Codes</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {rule.pricecodes.map(tbodyValue => <tr key={tbodyValue}>
                                                                <td bg-color={this.state.CheckBoxList.indexOf(tbodyValue)!=-1 ? 'green' : ""}>{tbodyValue}</td>
                                                            </tr>)}
                                                        </tbody>
                                                    </table></div>
                                                    {rule.variables.length !== 0 ?
                                                        <div className="col-5">
                                                <Table tableData={rule.variables} />
                                                        </div>
                                                        :
                                                        <div className="col-5">
                                                <Table tableData={jsonData.tabledata.Rules[0].variables} />
                                                        </div>
                                                    }
                                                    <div className="col-5">
                                            {rule.decision_makers === null ? < SubTable tableData={jsonData.tabledata.Rules[0]["decision_makers"]} /> : <SubTable tableData={rule.decision_makers} />}
                                                    </div>
                                                </>
                                }
                                        )}
                        </div> :
                        rules.map(rule =>
                            <div className="row">
                                <div className="col-12">
                                    <div style={{ marginTop: 30 }}>Pattern:
                                    <span class="badge badge-secondary">{rule.base_pricecode}</span><i style={{ fontSize: 24, marginLeft: 630 }} class="fa" data-toggle="tooltip" title={`DERIVED = ${this.state.derived} New_Host_Price = ${this.state.price}`}>&#xf05a;</i>
                                    </div>

                                </div>
                                <div className="col-2 ">
                                    <table className="" border="1" style={{ marginTop: 20 }} >
                                        <thead className="">
                                            <tr>
                                                <th>Price Codes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rule.pricecodes.map(code => <tr key={code}>
                                                <td bg-color={this.state.CheckBoxList.indexOf(code) != -1 ? 'green' : ""}>{code}</td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
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
export default PriceCode; 
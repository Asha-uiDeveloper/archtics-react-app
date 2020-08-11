import React, { Component } from 'react';
import { render } from 'react-dom';
// import ArchticsPage from './Pages/ArchticsPage';

import './style.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import BasePriceCode from './components/BasePriceCode';
import PriceCode from './components/PriceCodes';


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return <div className="container" style={{marginTop:30}}>
      {/* <BasePriceCode/> */}
        <PriceCode/>
      </div>
  }
}

render(<App />, document.getElementById('root'));

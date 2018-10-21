import React, { Component } from 'react';
import './App.css';
import NetWorth from './components/NetWorth';
import store from "./redux/store";
import {Provider} from "react-redux";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NetWorth />
      </Provider>
    );
  }
}

export default App;

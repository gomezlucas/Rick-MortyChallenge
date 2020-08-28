import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import generateStore from './redux/store';
import { BrowserRouter } from 'react-router-dom'
import 'typeface-roboto'

let store  = generateStore()

let WithRouter = () => <BrowserRouter><App /> </BrowserRouter>
let WithStore = () => <Provider store={store}><WithRouter /> </Provider>


ReactDOM.render(
  <WithStore/>,
  document.getElementById('root')
);



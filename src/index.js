import React from 'react';
import {render} from 'react-dom';
import Root from './App/App';
import 'bootstrap/scss/bootstrap.scss';


const rootElement = document.getElementById("app");
render(
    <Root/>,
    rootElement
);

module.hot.accept();
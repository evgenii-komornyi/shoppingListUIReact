import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import './js/libs/bootstrap.js';
import './css/all.min.css';
import App from './components/commonComponents/App';

ReactDOM.render((
	<Router>
		<App />
	</Router>
), document.getElementById("root"));
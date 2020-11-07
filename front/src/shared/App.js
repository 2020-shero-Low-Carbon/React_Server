import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Data from '../Data';
import Data2 from '../Data2';
import Home from '../pages/Home'
import About from '../pages/About'
import Testbed from '../pages/Testbed'

class App extends Component {
	render() {
		return (
			<div>
				<Route exact path="/" component={Home}/>
				<Route exact path="/about" component={About}/>
				<Route exact path="/testbed" component={Testbed}/>
				<Route exact path="/data" component={Data}/>
				<Route exact path="/data2" component={Data2}/>
			</div>
		);
	}	
}

export default App;

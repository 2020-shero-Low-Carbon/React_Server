import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Data from '../Data';
import Data2 from '../Data2';
import Home from '../pages/Home'
import About from '../pages/About'
import Testbed from '../pages/Testbed'

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className='Menu-wrapper'>
					<ul>
						<Link to='/'><li>Home</li></Link>
						<Link to='/about'><li>About Us</li></Link>
						<Link to='/testbed'><li>Testbed</li></Link>
					</ul>
				</div>
				<Router>
					<Route exact path="/" component={Home}/>
					<Route exact path="/about" component={About}/>
					<Route exact path="/testbed" component={Testbed}/>
					<Route exact path="/data" component={Data}/>
					<Route exact path="/data2" component={Data2}/>
				</Router>
			</div>
		);
	}	
}

export default App;

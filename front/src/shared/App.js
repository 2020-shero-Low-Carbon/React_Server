import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Data from '../Data';
import Data2 from '../Data2';
import Home from '../pages/Home';
import About from '../pages/About';
import Testbed from '../pages/Testbed';
import ShowGWP from '../pages/showgwp';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<div className='Menu-wrapper'>
						<ul>
							<Link to='/'><li>Home</li></Link>
							<Link to='/about'><li>About Us</li></Link>
							<Link to='/testbed'><li>Testbed</li></Link>
							<Link to='/showgwp'><li></li></Link>
						</ul>
					</div>
					<div className='Contents-wrapper'>
						<Switch>
							<Route exact path="/" component={Home}/>
							<Route exact path="/about" component={About}/>
							<Route exact path="/testbed" component={Testbed}/>
							<Route exact path="/showgwp" component={ShowGWP}/>
							<Route exact path="/data" component={Data}/>
							<Route exact path="/data2" component={Data2}/>
						</Switch>
					</div>
				</Router>
			</div>
		);
	}	
}

export default App;

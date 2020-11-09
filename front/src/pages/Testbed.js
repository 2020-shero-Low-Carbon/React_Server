import React, { Component } from 'react';
 
class Testbed extends Component {
	state = {
        infolist : [],
		vgwp : 0. ,
		isLoaded : false
    }

    componentWillMount() {
        fetch('http://34.64.182.81:8000/testbed/showlist')
        .then(response => response.json())
        .then(result => this.setState({
			infolist : result.data,
			vgwp : result['gwp'],
			isLoaded : true
        }));
    }
	handleClick = (e) => {
		e.preventDefault();
        fetch('http://34.64.182.81:8000/testbed/showlist')
        .then(response => response.json())
        .then(result => this.setState({
			infolist : result['data'],
			vgwp : result['gwp']
        }));
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.infolist !== this.state.infolist;
	}

	render() {
		return (
			<div>
				Testbed Page<br/>
				{
					(() => {
						if(this.state.isLoaded) return (<div>{this.state.vgwp}</div>);
						else return (<div>Loading</div>);
					})()
				}<br/>
			</div>
		);
	}	
}

export default Testbed;

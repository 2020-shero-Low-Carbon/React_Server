import React, { Component } from 'react';
 
class Testbed extends Component {
	state = {
        infolist : [],
		isLoaded : false
    }

    componentWillMount() {
        fetch('http://34.64.182.81:8000/testbed/showlist')
        .then(response => response.json())
        .then(result => this.setState({
			infolist : result,
			isLoaded : true
        }));
    }

	render() {
		return (
			<div>
				Testbed Page<br/>
				{
					(() => {
						if(this.state.isLoaded) return (<div>{this.state.infolist[0]['id']}</div>);
						else return (<div>Loading</div>);
					})()
				}<br/>
			</div>
		);
	}	
}

export default Testbed;

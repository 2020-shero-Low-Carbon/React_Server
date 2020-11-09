import React, { Component } from 'react';
 
class Testbed extends Component {
	state = {
        infolist : []
    }

    componentWillMount() {
        fetch('http://34.64.182.81:8000/testbed/showlist')
        .then(response => response.json())
        .then(result => this.setState({
			infolist : result
        }));
    }

	render() {
		return (
			<div>
				Testbed Page<br/>
                {this.state.infolist[0]["amount"]}
			</div>
		);
	}	
}

export default Testbed;

import React, { Component } from 'react';
 
class Testbed extends Component {
	state = {
        infolist : {},
    }

    function GetTestList() {
        fetch('http://34.64.182.81:8000/testbed/showlist')
        .then(response => response.json())
        .then(result => this.setState({
            infolist : result
        }));
    }

    componentWillMount() {
        GetTestList();
    }

	render() {
		return (
			<div>
				<h2>
					Testbed Page<br/>
                    {infolist[0]}
				</h2>
			</div>
		);
	}	
}

export default Testbed;

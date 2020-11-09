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

	render() {
		const title_style = {
            fontSize : '50px',
            margin : '20px'
        }
		const data = this.state.infolist;
		const style = {
			border: '1px solid black',
			padding: '8px',
			margin: '8px'
		};
		const list = data.map(
			info => (
				<div style={style}>
					{info['made_date'].substring(0,9)}
				</div>
			)
		);

		return (
			<div>
				<div>
					<div style = {title_style}>
						Testbed Page
					</div>
					<div style = {{fontSize : '20px', margin : '20px'}}>
						<button onClick={this.handleClick}>Refresh Data</button><br/><br/>
						Virtual GWP : {this.state.vgwp}
					</div>
				</div>
				{JSON.stringify(this.state.infolist)}
				<div>
					{list}
				</div>
			</div>
		);
	}	
}

export default Testbed;

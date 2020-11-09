import React, { Component } from 'react';

class testrow extends Component {
	static defaultProps = {
		info: {
			'id' : 0,
			'made_date' : '',
			'cement' : 0,
			'wsand' : 0,
			'msand' : 0,
			'bone' : 0,
			'water' : 0
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		if(this.props.info !=== nextProps.info) return true;
	}

	render() {
		const style = {
			border: '1px solid black',
			padding: '8px',
			margin: '8px'
		};

		return (
			<div style={style}>
				<div>{this.props.info['made_date'].slice(9)}</div>
			</div>
		);
	}
}

export default testrow;

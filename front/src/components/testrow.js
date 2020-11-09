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

	render() {
		const style = {
			border: '1px solid black',
			padding: '8px',
			margin: '8px'
		};

		const {id, md, cm, ws, ms, bn, wt} = this.props.info;

		return (
			<div style={style}>
				<div>{id}</div>
			</div>
		);
	}
}

export default testrow;

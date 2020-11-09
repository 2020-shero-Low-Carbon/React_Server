import React, { Component } from 'react';
 
class Testbed extends Component {
	state = {
        inputgwp : '' ,
        lastgwp : 0. ,
        mingwp : 0. ,
        mindate : '',
        gwplist : {},
        params : {
            syear : '2017',
            smonth : '1',
            sday :'1',
            fyear : '2019',
            fmonth : '12',
            fday : '31',
            prod : '1'
         }
    }
    componentWillMount() {
        /*fetch('http://34.64.182.81:8000/calgwp/gwplist', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.params)
        })
        .then(response => response.json())
        .then(result => this.setState({
            gwplist : result.listGWP,
            mingwp : result.minGWP.gwp,
            mindate : result.minGWP.date
        }));*/
    }
	render() {
		return (
			<div>
				<h2>
					Testbed Page	
				</h2>
			</div>
		);
	}	
}

export default Testbed;

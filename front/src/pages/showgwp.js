import React,{ Component } from 'react';
import GWPgraph from '../components/gwpgraph';
 
class ShowGWP extends Component {
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
        fetch('http://34.64.182.81:8000/calgwp/gwplist', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.params)
        })
        .then(response => response.json())
        .then(result => this.setState({
            gwplist : result.listGWP,
            mingwp : result.minGWP.gwp,
            mindate : result.minGWP.date
        }));
    }
	handleChange = (e) => {
        this.setState({
            inputgwp: e.target.value
        })
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
            lastgwp : parseFloat(this.state.inputgwp),
            inputgwp : ''
		})
	}
    render() {
        return (
            <div>
                <div style="font-size: 500%;">
                    <b> GWP Calculate Page </b>
                </div>
                <GWPgraph
                    raw_data = {this.state.gwplist}
                />
                <b>{this.state.params.syear}-{this.state.params.smonth}-{this.state.params.sday} ~ {this.state.params.fyear}-{this.state.params.fmonth}-{this.state.params.fday} , 25-24-150</b><br/>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="LastGWP in float"
                        value={this.state.inputgwp}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Apply</button>
                </form>
                {this.state.lastgwp}<br/>
                Cut-Down Rate : 3.3% <br/>
                {
                    (() => {
                        if (this.state.lastgwp * 0.967 >= this.state.mingwp) return (<div>Low-Carbon-Authentification : able</div>);
                        else return (<div>Low-Carbon-Authentification : disable</div>);
                    })()
                }
                Calculated Minimum GWP : {this.state.mingwp} <br/>
                Date When makes GWP Minimum{this.state.mindate} <br/>
            </div>
        );
    }
}// 

export default ShowGWP;

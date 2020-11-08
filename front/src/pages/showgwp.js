import React,{ Component } from 'react';
 
class ShowGWP extends Component {
    state = {
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
    render() {
        return (
            <div>
                <meta charset="UTF-8"/>
                <b>{this.state.params.syear}-{this.state.params.smonth}-{this.state.params.sday} ~ {this.state.params.fyear}-{this.state.params.fmonth}-{this.state.params.fday} , 25-24-150</b><br/>
                <b>{this.state.gwplist["2017-12-31"]}</b><br/>
                {this.state.lastgwp}<br/>
                °¨Ãà·ü : 3.3% <br/>
                {
                    (() => {
                        if (this.state.lastgwp * 0.967 <= this.state.mingwp) return (<div>ÀúÅº¼ÒÀÎÁõ °¡´É</div>);
                        else return (<div></div>);
                    })()
                }
                {this.state.mingwp} <br/>
                {this.state.mindate} <br/>
            </div>
        );
    }
}// 

export default ShowGWP;

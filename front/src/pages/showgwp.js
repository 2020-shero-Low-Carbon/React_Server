import React,{ Component } from 'react';
 
class ShowGWP extends Component {
    state = {
        lastgwp : {},
        mingwp : 0. ,
        gwplist : {},
        params : {
            mode : '0',
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
            posts: result
        }));
    }
    render() {
        return (
            <div>
                <b>{this.state.params.syear}-{this.state.params.smonth}-{this.state.params.sday} ~ {this.state.params.fyear}-{this.state.params.fmonth}-{this.state.params.fday} , 25-24-150</b><br/>
                <b>{this.state.posts['2017-12-31']}</b>
            </div>
        );
    }
}

export default ShowGWP;

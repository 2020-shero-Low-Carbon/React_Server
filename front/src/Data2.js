import React,{ Component } from 'react';
 
class Data extends Component {
    state = {
        posts : {},
        params : {
            mode : '0',
            syear : '2018',
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
                hello I am data<br/>
                <b>{this.state.posts."2019-1-1"}</b>
            </div>
        );
    }
}

export default Data;

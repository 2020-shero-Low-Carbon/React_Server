import React,{ useState } from 'react';
 
class Data extends Component {
    state = {
        data : [],
    }
    fetch('/data')
        .then(res => res.json())
        .then(data => {
            this.setState({
                data : data
            })
        })
    render() {
        return (
            <div>
                {data.lastname} {data.firstname}
            </div>
        );
    }
}
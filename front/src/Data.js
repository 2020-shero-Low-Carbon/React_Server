import React,{ useState } from 'react';
 
class Data extends Component {
    state = {
        data : [],
    }
    fetch("http://34.64.182.81:8000/data")
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
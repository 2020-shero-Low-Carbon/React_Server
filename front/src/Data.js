import React,{ useState } from 'react';
 
class Data extends Component {
    state = {
        data : [],
    }
    fetch('/data')
     .then(response => response.json())
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
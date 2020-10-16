import React,{ useState } from 'react';
 
class Data extends Component {
    state = {
        posts : [],
    }
    componentWillMount() {
        fetch('/data')
            .then(response => response.json())
            .then(data => this.setState({
                posts: data
            }));
    }
    render() {
        return (
            <div>
                {data.lastname} {data.firstname}
            </div>
        );
    }
}
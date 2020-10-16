import React,{ Component } from 'react';
 
class Data extends Component {
    state = {
        posts : [],
    }
    componentWillMount() {
        console.log("hi console")
        fetch('http://34.64.182.81:8000/data')
            .then(response => response.json())
            .then(dataw => this.setState({
                posts: data
            }));
    }
    render() {
        return (
            <div>
                hello I am data
                {this.state.posts.lastname} {this.state.posts.firstname}
            </div>
        );
    }
}

export default Data;

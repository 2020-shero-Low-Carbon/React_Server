import React,{ Component } from 'react';
 
class Data extends Component {
    state = {
        posts : [],
        string : ,
    }
    componentWillMount() {
        fetch('http://34.64.182.81:8000/data')
            .then(response => this.setState({
                string: response
            })
            );
            //.then(response => response.json())
            //.then(data => this.setState({
            //    posts: data
            //})
    }
        //        {this.state.posts.lastname} {this.state.posts.firstname}
    render() {
        return (
            <div>
                hello I am data
                {this.state.string}
            </div>
        );
    }
}

export default Data;

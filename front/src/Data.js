import React,{ Component } from 'react';
 
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
                {this.state.posts.lastname} {this.state.posts.firstname}
            </div>
        );
    }
}

export default Data;
import React, { Component } from 'react';

import './FullPost.css';
import Axios from 'axios';

class FullPost extends Component {
  state = {
    loadedPost: null
  };
  loadData = async () => {
    let post;
    if (this.props.match.params.id !== null) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !== +this.props.match.params.id)
      ) {
        post = await Axios.get(
          'https://jsonplaceholder.typicode.com/posts/' +
            this.props.match.params.id
        );

        this.setState({ loadedPost: post.data });
      }
    }
  };
  componentDidUpdate() {
    this.loadData();
  }
  componentDidMount() {
    this.loadData();
  }
  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (this.props.match.params.id === null) {
      return post;
    }
    if (this.state.loadedPost === null) {
      return (
        <p style={{ textAlign: 'center' }}>No post is currently available</p>
      );
    }
    post = (
      <div className="FullPost">
        <h1>{this.state.loadedPost.title}</h1>
        <p>{this.state.loadedPost.body}</p>
        <div className="Edit">
          <button className="Delete">Delete</button>
        </div>
      </div>
    );
    return post;
  }
}

export default FullPost;

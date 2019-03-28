import React, { Component } from 'react';

import './NewPost.css';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class NewPost extends Component {
  state = {
    title: '',
    content: '',
    author: 'Max',
    submitted: false
  };
  componentDidMount() {
    //console.log('inside New posts', this.props);
  }
  postDataHandler = () => {
    const post = {
      title: this.state.title,
      body: this.state.body,
      author: this.state.author
    };
    Axios.post('https://jsonplaceholder.typicode.com/posts', post).then(res => {
      console.log(res);
      //this.props.history.push('/posts'); // this will maintain the history so we can go back.
      this.props.history.replace('/posts'); // like redirect we cant go back;
    });
    // this.setState({ submitted: true }); // we cant go back when we use redirect
  };
  render() {
    let redirect = null;
    if (this.state.submitted) {
      redirect = <Redirect to="/posts" />;
    }
    return (
      <div className="NewPost">
        {redirect}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;

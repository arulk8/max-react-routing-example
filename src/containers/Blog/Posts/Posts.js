import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from 'axios';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
class Posts extends Component {
  state = {
    posts: []
  };
  async componentDidMount() {
    try {
      let { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      data = data.slice(0, 4).map(i => {
        return { ...i, author: 'Max' };
      });

      this.setState({ posts: data });
    } catch (ex) {
      console.log(ex);
    }
    //console.log('inside Posts', this.props);
  }
  postSelectorHandler = id => {
    console.log(this.props);
    this.props.history.push({ pathname: '/posts/' + id });
  };
  render() {
    const post = this.state.posts.map(post => {
      return (
        // <Link to={'/posts/' + post.id} key={post.id}>
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectorHandler(post.id)}
        />
        // </Link>
      );
    });
    return (
      <div>
        <section className="Posts">{post}</section>
        <Route
          path={this.props.match.url + '/:id'}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;

import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPost: null
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
  }
  postSelectorHandler = id => {
    console.log(id);
    this.setState({ selectedPost: id });
  };
  render() {
    const post = this.state.posts.map(post => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectorHandler(post.id)}
        />
      );
    });

    return (
      <div>
        <header className="Blog">
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/new-post">New Post</a>
              </li>
            </ul>
          </nav>
        </header>
        <section className="Posts">{post}</section>
        {/* <section>
          <FullPost id={this.state.selectedPost} />
        </section>
        <section>
          <NewPost />
        </section> */}
      </div>
    );
  }
}

export default Blog;

import React, { Component } from 'react';
import axios from 'axios';

import ModalForm from './ModalForm';

class App extends Component {
  state = {
    title: '',
    body: '',
    post: [],
    show: false,
    loading: false,
  };
  resetForm = () => {
    this.setState({ title: '', body: '' });
  };
  hideModal = () => {
    this.setState({ show: false });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleDelete = (id) => {
    if (window.confirm('Are you sure')) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/posts/` + id)
        .then((res) => {
          console.log(res);
        });
    }
  };
  handleEdit = (id) => {
    this.setState({ show: true });
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
      const currValue = res.data.find((dt) => dt.id === id);
      this.setState({ title: currValue.title, body: currValue.body });
    });
    console.log(' handle Edit clicked', id);
  };
  handleUpdate = (e) => {
    this.setState({ loading: true });
    e.preventDefault();
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, {
        method: 'PUT',
        body: {
          title: this.state.title,
          body: this.state.body,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((res) => {
        if (res.status === 201) {
          this.setState({ show: false, loading: false });
          this.resetForm();
          console.log(res, ' updated');
        }
      });
  };
  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
      this.setState({ post: res.data });
    });
  }
  render() {
    const { post, title, body, loading } = this.state;
    const mystyle = {
      border: '1px solid black',
    };
    return (
      <div>
        <table style={mystyle}>
          <thead>
            <tr style={mystyle}>
              <th style={mystyle}>userId </th>
              <th style={mystyle}>Id</th>
              <th style={mystyle}>Title</th>
              <th style={mystyle}>Body</th>
              <th style={mystyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {post.map((p) => {
              return (
                <tr key={p.id}>
                  <td style={mystyle}>{p.userId}</td>
                  <td style={mystyle}>{p.id}</td>
                  <td style={mystyle}>{p.title}</td>
                  <td style={mystyle}>{p.body}</td>
                  <td style={mystyle}>
                    <button onClick={() => this.handleEdit(p.id)}>Edit</button>
                    <button onClick={() => this.handleDelete(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ModalForm
          disabled={loading}
          handleSubmit={this.handleUpdate}
          editMoal={true}
          show={this.state.show}
          handleClose={this.hideModal}
        >
          <label htmlFor='title'>
            Title:
            <input
              onChange={this.handleChange}
              value={title}
              type='text'
              id='title'
              name='title'
              disabled={loading}
            />
          </label>
          <label htmlFor='body'>
            <br />
            Body:
            <input
              onChange={this.handleChange}
              value={body}
              type='text'
              id='body'
              name='body'
              disabled={loading}
            />
          </label>
        </ModalForm>
      </div>
    );
  }
}

export default App;

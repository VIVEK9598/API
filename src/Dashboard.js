import React, { Component } from 'react';
import ModalForm from './ModalForm';
import axios from 'axios';
import App from './App';
import './ModalForm.css';

class Dashboard extends Component {
  state = {
    loading: false,
    show: false,
    title: '',
    body: '',
  };
  resetForm = () => {
    this.setState({ title: '', body: '' });
  };
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
    this.resetForm();
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  clearForm = () => {
    document.getElementById('form');
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    console.log(this.state.form, ' form');
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, {
        method: 'POST',
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
          console.log(res, ' added');
        }
      });
  };

  render() {
    const { title, body, loading } = this.state;

    return (
      <main>
        <ModalForm
          disabled={loading}
          handleSubmit={(e) => this.handleSubmit(e)}
          addModal={true}
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
        <button className='add' type='button' onClick={this.showModal}>
          Add
        </button>
        <App />
      </main>
    );
  }
}

export default Dashboard;

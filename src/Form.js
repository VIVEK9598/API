import React, { Component } from 'react';
import { TextField, Button, Container, Typography } from '@material-ui/core';
import axios from 'axios';

class Form extends Component {
  state = {
    post: []
  }

  componentDidMount() {
    const id = this.props.match.params.id
    if (id !== "id") {
      axios.get(`https://jsonplaceholder.typicode.com/posts/`)
        .then(res => {
          this.setState({ post: res.data }, () => {
            const currentPost = this.state.post.find(p => p.id == id)
            this.setState({ title: currentPost.title, body: currentPost.body, currentPost: currentPost })
          })
        })
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = (event) => {

    event.preventDefault()
    if (this.state.currentPost) {
      axios.put(`https://jsonplaceholder.typicode.com/posts/` + this.state.currentPost.id, {
        title: this.state.currentPost.title,
        body: this.state.currentPost.body
      })
        .then(res => {
          alert("updated")
        })
        .catch(err => {
          alert("Error occured!")
          console.log(err)
        });

    }
    else {
      axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title: this.state.title,
        body: this.state.body
      })
        .then(() => {
          alert("added")
        })
        .catch(err => {
          alert("Error occured!")
          console.log(err)
        });
    }
  }
  render() {

    const { title, body, currentPost } = this.state
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '27vh' }} >
            <div>
              <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <TextField
                  value={title && title}
                  name="title"
                  onChange={this.handleChange}
                  id="title"
                  label="Title" /><br />
                <TextField
                  value={body && body}
                  name="body"
                  onChange={this.handleChange}
                  id="body"
                  label="Body" /><br /><br />
                <Button type="submit" variant="contained" color="primary">
                  {currentPost ? "Update" : "Submit"}
                </Button>

              </form>
            </div>
          </Typography>
        </Container>

      </React.Fragment>

    )
  }
}

export default Form;
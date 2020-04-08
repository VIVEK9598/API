import React, { Component } from 'react';
import axios from 'axios';
import ModalForm from './ModalForm';
import Toolbar from '@material-ui/core/Toolbar';

class App extends Component {


  state = {
    post: [],
    open: false
  }
  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
      .then(res => {
        this.setState({ post: res.data })


      })

  }


  handleDelete = id => {
    if (window.confirm("Are you sure")) {
      axios.delete(`https://jsonplaceholder.typicode.com/posts/` + id)
        .then(res => {
          alert("Deleted")
        })
        .catch(err=>{
          console.log(err)
        });
    }
  };
  handleEdit = id => {
    const currentPost = this.state.post.find(p => p.id === id)
    this.setState({ open: true,id:currentPost.id, title: currentPost.title, body: currentPost.body, editing: true })
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    if (this.state.editing === true) {
      axios.put(`https://jsonplaceholder.typicode.com/posts/`+this.state.id,{
      title:this.state.title,
      body:this.state.body
      })
        .then(res => {
          this.setState({open:false})
          alert("updated")
        })
        .catch(err=>{
          console.log(err)
        });
        
    }
    else {
      axios.post(`https://jsonplaceholder.typicode.com/posts`,{
        title:this.state.title,
        body:this.state.body
      })
        .then(()=>{
          this.setState({open:false})
          alert("added")
        })
        .catch(err=>{
          console.log(err)
        });
    }
  }
  render() {

    const { post } = this.state

    const mystyle = {
      border: "1px solid black"
    };
    return (
      <div>
        <Toolbar>
          <button
            vairant="primary"
            onClick={() => this.setState({ open: true, editing: false })}
          >Add
          </button>

        </Toolbar>
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
          <tbody>{post.map(p => {
            return (
              <tr key={p.id}>

                <td style={mystyle}>{p.userId}</td>
                <td style={mystyle}>{p.id}</td>
                <td style={mystyle}>{p.title}</td>
                <td style={mystyle}>{p.body}</td>
                <td style={mystyle}>
                  <button
                    onClick={() => this.handleEdit(p.id)}
                  >Edit</button>
                  <button
                    onClick={() => this.handleDelete(p.id)}
                  >Delete</button>
                </td>

              </tr>
            )
          })
          }
          </tbody>
        </table>
        <ModalForm
          open={this.state.open}
          onClose={() => {
            this.setState({ open: false })
          }}
          title={this.state.title}
          body={this.state.body}
          editing={this.state.editing}
          handleChange={this.handleChange}
          doSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;

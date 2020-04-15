import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';


class PostList extends Component {

  state = {
    post: [],
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
        .catch(err => {
          alert("Error occured!")
          console.log(err)
        });
    }
  };
  handleEdit = id => {
    this.props.history.push('/form/' + id)
  };

  render() {
    const { post } = this.state

    const mystyle = {
      border: "1px solid black"
    };
    return (

      <div>
        <Link to="/form/id">
          <button>Add</button>
        </Link>

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

      </div>


    );
  }
}

export default withRouter(PostList);
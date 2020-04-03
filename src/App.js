import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {

  state = {
    post: []
  }
  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
      .then(res => {
        this.setState({ post: res.data })


      })

  }
  render() {

    const { post } = this.state

    const mystyle = {
      border: "1px solid black"
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
          <tbody>{post.map(p => {
            return (<tr key={p.id}>

              <td style={mystyle}>{p.userId}</td>
              <td style={mystyle}>{p.id}</td>
              <td style={mystyle}>{p.title}</td>
              <td style={mystyle}>{p.body}</td>

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

export default App;

import React, { Component } from "react";
import ModalForm from './ModalForm';
import App from './App'
import './ModalForm.css'

class Dashboard extends Component {
  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
 

  render() {
    return (
      <main>
         
        <ModalForm show={this.state.show} handleClose={this.hideModal}></ModalForm>
        <button className="add" type="button" onClick={this.showModal}>
          Add
        </button>
        <App />
      </main>
    );
  }
}

export default Dashboard;
import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import Form from './Form';
import PostList from './PostList';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/form/:id" component={Form} />
        <Route exact path="/" component={PostList} />
      </Switch>
    </Router>
  )
}

export default App

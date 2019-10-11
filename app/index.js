import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListPost from './components/ListPost'
import Post from './components/Post'
import Navbar from './components/Navbar'
import './index.css'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Navbar />
          <Switch>
            <Route exact path='/post' component={Post} />
            <Route exact path={['/', '/new']} component={ListPost} />
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
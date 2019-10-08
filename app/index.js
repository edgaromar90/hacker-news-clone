import React from 'react'
import ReactDOM from 'react-dom'
import TopNews from './components/TopNews'
import './index.css'

class App extends React.Component {
  render() {
    return (
      <div>
        <TopNews />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
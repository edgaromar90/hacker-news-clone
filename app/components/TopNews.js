import React from 'react'
import { fetchTopStories } from '../utils/api'

export default class TopNews extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      topNews: null,
      loading: true,
    }
  }

  componentDidMount () {
    fetchTopStories()
      .then((data) => {

        this.setState({
          topNews: data,
          loading: false,
        })

      }).catch((err) => {
        console.warn("error loading top stories", err)

        this.setState({ loading: false })
      })
  }

  render() {
    const { topNews, loading } = this.state

    return (
      <div>
        {topNews && JSON.stringify(topNews, null, 2)}
        {loading && <p>Loading</p>}
      </div>
    )
  }
}
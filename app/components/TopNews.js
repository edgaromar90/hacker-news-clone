import React from 'react'
import Story from './Story'
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
        <ul>
        {topNews && topNews.map(({ descendants, time, title, type, url, id, by }) => (
          <li key={id} className='story-list'>
            <Story
              numberOfComments={descendants}
              date={new Date(new Date().getTime() - time).toLocaleString()}
              title={title}
              type={type}
              url={url}
              author={by}
            />
          </li>
        ))}
        </ul>
        {loading && <p>Loading</p>}
      </div>
    )
  }
}
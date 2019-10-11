import React from 'react'
import { StoryTitle, StorySubtitle } from './Story'
import { fetchAllStories } from '../utils/api'
import storyType from '../utils/constants'
import Loading from '../components/Loading'

export default class ListPost extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      topNews: null,
      loading: true,
    }

    this.fetchData = this.fetchData.bind(this)
  }

  componentDidMount () {
    this.fetchData()
  }

  componentDidUpdate (prevProps) {
    prevProps.match.path != this.props.match.path && this.fetchData()
  }

  fetchData () {
    const { path } = this.props.match
    const type =  path == '/' ? storyType.TOP : storyType.NEW

    this.setState({ loading: true, topNews: null })
    fetchAllStories(type)
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
        {topNews && topNews.map(({ descendants = 0, time, title, url="", id, by }) => (
          <li key={id} className='story-list'>
            <StoryTitle
              url={url}
              title={title}
            />
            <StorySubtitle
              postId={id}
              numberOfComments={descendants}
              date={new Date(new Date().getTime() - time).toLocaleString()}
              author={by}
             />
          </li>
        ))}
        </ul>
        {loading && <Loading />}
      </div>
    )
  }
}
import React from 'react'
import queryString from 'query-string'
import { fetchUserData } from '../utils/api'
import { StoryTitle, StorySubtitle } from '../components/Story'
import Loading from '../components/Loading'

export default class User extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      userInfo: {},
    }
  }

  componentDidMount () {
    const { id } = queryString.parse(this.props.location.search)

    fetchUserData(id)
      .then((userInfo) => {
        this.setState({
          loading: false,
          userInfo,
        })
      }).catch((err) => {
        console.warn("Error loading user data", err)

        this.setState({
          loading: false,
          userInfo: {}
        })
      })
  }

  render() {
    const { id:title, karma, about, url, created, posts } = this.state.userInfo

    return (
      <div>
        <h3 className='story-title big-title'>
          {url ? (<a href={url}>{title}</a>) : title}
        </h3>
        <div className='story-subtitle'>
          Joined <span className='strong'>{new Date(new Date().getTime() - created).toLocaleString()} </span>
          has
          <span className='strong'> {karma}</span> karma
        </div>
        <div className='about' dangerouslySetInnerHTML={{__html: about}} />
        <h2>Posts</h2>
        {this.state.loading
          ? <Loading />
          : (
            <ul>
            {posts && posts.map(({ descendants = 0, time, title, url="", id, by }) => (
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
          )}
      </div>
    )
  }
}
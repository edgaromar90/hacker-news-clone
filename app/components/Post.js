import React from 'react'
import queryString from 'query-string'
import { StoryTitle, StorySubtitle } from './Story'
import { fetchPost } from '../utils/api'

export default class Post extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: null,
      loading: true,
      post: null,
    }
  }

  componentDidMount () {
    const { id } = queryString.parse(this.props.location.search)

    fetchPost(id)
      .then(({ comments, ...post }) => {
        this.setState({
          comments,
          post,
          loading: false
        })
      })
  }

  render() {
    const { comments = [], loading, post } = this.state

    if(!post) {
      return null
    }

    const { id, descendants, title, time, url, by } = post

    return (
      <div className='post-container'>
        <StoryTitle
          url={url}
          title={title}
          className="big-title"
        />
        <StorySubtitle
          postId={id}
          numberOfComments={descendants}
          date={new Date(new Date().getTime() - time).toLocaleString()}
          author={by}
         />
        {comments.map(({ text, by:author, time:date }, index) => (
          <div key={index} className='comment-card'>
            <StorySubtitle
              postId={id}
              date={new Date(new Date().getTime() - time).toLocaleString()}
              author={author}
             />
            <div dangerouslySetInnerHTML={{__html: text}} />
          </div>
        ))}
      </div>
    )
  }
}
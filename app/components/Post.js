import React from 'react'
import queryString from 'query-string'
import Story from './Story'
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
    //Get the post_id from queryUrl
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

    const { id, descendants, title, time, type, url, by } = post

    return (
      <div className='post-container'>
        <Story
          postId={id}
          numberOfComments={descendants}
          date={new Date(new Date().getTime() - time).toLocaleString()}
          title={title}
          type={type}
          url={url}
          author={by}
        />
        {comments.map(({ text, by:author, time:date }, index) => (
          <div key={index} className='comment-card'>
            <p className='story-subtitle'>
              by <a href="#">{author}</a> on {new Date(new Date().getTime() - date).toLocaleString()}
            </p>
            <div dangerouslySetInnerHTML={{__html: text}} />
          </div>
        ))}
      </div>
    )
  }
}
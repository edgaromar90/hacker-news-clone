import React from 'react'
import queryString from 'query-string'
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
    const { comments, loading, post } = this.state

    if(!post) {
      return null
    }

    console.log("state", this.state)

    return (
      <React.Fragment>
        <h3 className='story-title'>
          {post.title}
        </h3>
        {comments.map(({ text, by:author, time:date }, index) => (
          <div className='comment-card'>
            <p className='story-subtitle'>
              by <a href="#">{author}</a> on {new Date(new Date().getTime() - date).toLocaleString()}
            </p>
            <div key={index} dangerouslySetInnerHTML={{__html: text}} />
          </div>
        ))}
      </React.Fragment>
    )
  }
}
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Story ({ numberOfComments, date, title, type, url, author, postId }) {
  return (
    <React.Fragment>
      <h3 className='story-title'>
        <a href={url}>{title}</a>
      </h3>
      <p className='story-subtitle'>
        by <a href="#">{author}</a> on {date} with
        <Link to={{pathname: '/post', search: `?id=${postId}`}}> {numberOfComments}</Link> comments
      </p>
    </React.Fragment>
  )
}

Story.propTypes = {
  numberOfComments: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  type: PropTypes.string,
  postId: PropTypes.number.isRequired
}
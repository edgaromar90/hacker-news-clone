import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export function StoryTitle ({ url, title, className }) {
  return (
    <h3 className={`story-title ${className}`}>
      {url ? (<a href={url}>{title}</a>) : title}
    </h3>
  )
}

StoryTitle.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export function StorySubtitle ({ author, date, postId, numberOfComments }) {
  return (
    <p className='story-subtitle'>
      by <a href="#">{author}</a> on {date} {isNaN(numberOfComments)
        ? null
        : <React.Fragment>
            with <Link to={{pathname: '/post', search: `?id=${postId}`}}> {numberOfComments}</Link> comments
          </React.Fragment>}
    </p>
  )
}

StorySubtitle.propTypes = {
  author: PropTypes.string.isRequired,
  numberOfComments: PropTypes.number,
  date: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired
}
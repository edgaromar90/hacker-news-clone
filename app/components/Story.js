import React from 'react'
import PropTypes from 'prop-types'

export default function Story ({ numberOfComments, date, title, type, url, author }) {
  return (
    <React.Fragment>
      <h3 className='story-title'>
        <a href={url}>{title}</a>
      </h3>
      <p className='story-subtitle'>
        by <a href="#">{author}</a> on {date} with <a href="#">{numberOfComments}</a> comments
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
}
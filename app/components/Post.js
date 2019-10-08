import React from 'react'

export default class Post extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: null,
      loading: true,
    }
  }

  componentDidMount () {
    console.log("Mounted")
    //Get the post_id from queryUrl
  }

  render() {
    return (
      <div>Comments</div>
    )
  }
}
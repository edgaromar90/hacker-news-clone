function fetchStories (type) {
  return fetch(`https://hacker-news.firebaseio.com/v0/${type}.json?print=pretty`)
    .then((res) => res.json())
    .then((data) => data.slice(0, 100))
}

export function fetchAllStories (type) {
  return fetchStories(type)
    .then((storyIds) => {
      return Promise.all(storyIds.map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
          .then((res) => res.json())
      )).then((stories) => stories.filter((story) => story !== null))
    })
}

export function fetchPost (id) {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    .then((res) => res.json())
    .then(({ kids, ...rest }) => {
      return !kids ? {...rest} : Promise.all(
        kids.map((id) => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
          .then((res) => res.json())
          ))
          .then((comments) => comments.filter((comment) => comment !== null && !comment.deleted))
          .then((comments) => ({ ...rest, comments }))
    })
}

export function fetchUserData (id) {
  return fetch(`https://hacker-news.firebaseio.com/v0/user/${id}.json?print=pretty`)
    .then((res) => res.json())
    .then(({ submitted, ...rest }) => {
      return Promise.all(submitted.slice(0, 50).map((id) => fetchPost(id)))
        .then((posts) => posts.filter((post) => post !== null && post.type == 'story' && post.title && post.by))
        .then((posts) => ({ ...rest, posts }))
    })
}
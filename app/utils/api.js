function fetchStories (type) {
  return fetch(`https://hacker-news.firebaseio.com/v0/${type}.json?print=pretty`)
    .then((res) => res.json())
    .then((data) => data.slice(0, 50))
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
          .then((comments) => comments.filter((comment) => comment !== null))
          .then((comments) => ({ ...rest, comments }))
    })
}

//export function fetchBestStories () {
//  return fetchStories(storyType.BEST_STORIES)
//}
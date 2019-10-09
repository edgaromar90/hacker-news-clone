import storyType from './constants'

function fetchStories (type) {
  return fetch(`https://hacker-news.firebaseio.com/v0/${type}.json?print=pretty`)
    .then((res) => res.json())
    .then((data) => data.slice(0, 50))
}

export function fetchTopStories () {
  return fetchStories(storyType.TOP_STORIES)
    .then((storyIds) => {
      return Promise.all(storyIds.map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
          .then((res) => res.json())
      ))
    })
}

export function fetchPost (id) {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    .then((res) => res.json())
    .then(({ kids, ...rest }) => {
      return Promise.all(
        kids.map((id) => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
          .then((res) => res.json())
          )).then((comments) => ({ ...rest, comments }))
    })
}

//export function fetchBestStories () {
//  return fetchStories(storyType.BEST_STORIES)
//}
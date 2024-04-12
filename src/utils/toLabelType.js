import movieType from '../lib/movieType.json'

const toLabelType = value => {
  const movie = movieType.find(item => item.value === value)
  return movie.label
}

export { toLabelType }

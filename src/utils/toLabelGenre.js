import movieGenre from '../lib/movieGenre.json'

const toLabelGenre = value => {
  const movie = movieGenre.find(item => item.value === value)
  return movie.label
}

export { toLabelGenre }

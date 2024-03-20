import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../redux/feature/authSlice'
import MovieReducer from '../redux/feature/movieSlice'
import WatchlistReducer from '../redux/feature/watchlistSlice'
import RatingReducer from '../redux/feature/ratingSlice'
import CommentReducer from '../redux/feature/commentSlice'
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    movie: MovieReducer,
    watchlist: WatchlistReducer,
    rating: RatingReducer,
    comment: CommentReducer
  }
})

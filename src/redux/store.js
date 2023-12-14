import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from '../redux/feature/authSlice'
import MovieReducer from '../redux/feature/movieSlice'
import WatchlistReducer from '../redux/feature/watchlistSlice'
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    movie: MovieReducer,
    watchlist: WatchlistReducer
  }
})

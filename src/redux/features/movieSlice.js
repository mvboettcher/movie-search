import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieResults: [],
  selectedMovie: null,
  totalResultsCount: null,
  searchError: null,
  isLoading: false,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovieResults: (state, action) => {
      state.movieResults = action.payload;
    },
    clearMovieResults: (state) => {
      state.movieResults = [];
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    setTotalResultsCount: (state, action) => {
      state.totalResultsCount = action.payload;
    },
    clearTotalResultsCount: (state) => {
      state.totalResultsCount = null;
    },
    setSearchError: (state, action) => {
      state.searchError = action.payload;
    },
    clearSearchError: (state) => {
      state.searchError = null;
    },
    toggleIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setMovieResults,
  clearMovieResults,
  setSelectedMovie,
  clearSelectedMovie,
  setTotalResultsCount,
  clearTotalResultsCount,
  setSearchError,
  clearSearchError,
  toggleIsLoading,
} = movieSlice.actions;

export const getMovieResults = (state) => state.movie.movieResults;
export const getSelectedMovie = (state) => state.movie.selectedMovie;
export const getTotalResultsCount = (state) => state.movie.totalResultsCount;
export const getSearchError = (state) => state.movie.searchError;
export const getIsLoading = (state) => state.movie.isLoading;

export default movieSlice.reducer;

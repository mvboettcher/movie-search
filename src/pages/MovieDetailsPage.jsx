import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { MovieAPI } from "../api/MovieAPI";

const MovieDetailsPage = ({ selectedMovie }) => {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    MovieAPI.getMovieById(movieId).then((data) => {
      if (data.Error) {
        setError(data.Error);
        setIsLoading(false);
      }
      //   console.log(data);
      setDetails(data);
      setIsLoading(false);
    });
  }, [movieId]);

  if (isLoading) {
    return <h4>Loading...</h4>;
  } else {
    return (
      <div>
        <h4>Movie Details...</h4>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    selectedMovie: state.movie.selectedMovie,
  };
};

export default connect(mapStateToProps)(MovieDetailsPage);

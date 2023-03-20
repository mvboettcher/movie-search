import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { MovieAPI } from "../api/MovieAPI";
import MovieCard from "../components/MovieCard";

const MovieDetailsPage = ({ selectedMovie }) => {
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    MovieAPI.getMovieById(movieId).then((data) => {
      if (data.Error) {
        setError(data.Error);
        setIsLoading(false);
      }
      setDetails(data);
      setIsLoading(false);
    });
  }, [movieId]);

  const renderPageContent = () => {
    if (isLoading) {
      return <h3 className="mt-3">Loading...</h3>;
    } else if (error) {
      return (
        <h3 className="mt-3" style={{ color: "red" }}>
          {error}
        </h3>
      );
    } else {
      return <MovieCard movie={details} />;
    }
  };

  return (
    <div className="d-flex justify-content-center">{renderPageContent()}</div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedMovie: state.movie.selectedMovie,
  };
};

export default connect(mapStateToProps)(MovieDetailsPage);

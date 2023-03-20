import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const ResultsPage = (props) => {
  const { movieResults, totalResultsCount, searchError } = props;
  const navigate = useNavigate();

  const renderMovieResults = () => {
    return movieResults.map((movie, index) => {
      const { Title, Year, imdbID } = movie;
      return (
        <div
          key={index}
          onClick={() => navigate(`${imdbID}`)}
        >{`${Title} - ${Year} (ID: ${imdbID})`}</div>
      );
    });
  };

  if (movieResults) {
    return (
      <div>
        <h5>{`${totalResultsCount} Results`}</h5>
        {renderMovieResults()}
      </div>
    );
  } else if (searchError) {
    return <div>{searchError}</div>;
  } else return null;
};

const mapStateToProps = (state) => {
  return {
    movieResults: state.movie.movieResults,
    totalResultsCount: state.movie.totalResultsCount,
    searchError: state.movie.searchError,
    isLoading: state.movie.isLoading,
  };
};

export default connect(mapStateToProps)(ResultsPage);

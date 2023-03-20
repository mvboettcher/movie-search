import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
// Bootstrap Components
import ListGroup from "react-bootstrap/ListGroup";

const ResultsPage = (props) => {
  const { movieResults, totalResultsCount, searchError } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!totalResultsCount) {
      navigate("/");
    }
  }, [totalResultsCount, navigate]);

  const renderMovieListItems = () => {
    return movieResults.map((movie, index) => {
      const { Title, Year, imdbID } = movie;
      return (
        <ListGroup.Item
          key={index}
          className="text-start"
          action
          onClick={() => navigate(`${imdbID}`)}
        >
          <span className="fw-bold">{Title}</span>
          <span className="fst-italic">{`- ${Year}`}</span>
        </ListGroup.Item>
      );
    });
  };

  if (movieResults) {
    return (
      <div className="d-flex flex-column align-items-center">
        <h5 className="mb-5">{`Showing ${movieResults.length} of ${totalResultsCount} results...`}</h5>
        <ListGroup style={{ width: "50%" }}>{renderMovieListItems()}</ListGroup>
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

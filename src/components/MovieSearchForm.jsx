import React from "react";
import { useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import { Search } from "react-bootstrap-icons";

import {
  setMovieResults,
  clearMovieResults,
  clearSelectedMovie,
  setTotalResultsCount,
  clearTotalResultsCount,
  setSearchError,
  clearSearchError,
  toggleIsLoading,
} from "../redux/features/movieSlice";

import { MovieAPI } from "../api/MovieAPI";

const schema = yup
  .object({
    title: yup.string().required(),
  })
  .required();

const MovieSearchForm = (props) => {
  const { isLoading, searchError } = props;
  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const clearResults = () => {
    dispatch(clearMovieResults());
    dispatch(clearTotalResultsCount());
    dispatch(clearSelectedMovie());
    dispatch(clearSearchError());
  };

  const fetchMovies = (data) => {
    MovieAPI.getSearchResults(data.title).then((data) => {
      if (data.Error) {
        dispatch(setSearchError(data.Error));
        dispatch(toggleIsLoading(false));
      } else {
        dispatch(setMovieResults(data.Search));
        dispatch(setTotalResultsCount(data.totalResults));
        dispatch(toggleIsLoading(false));
        navigate("movies");
      }
    });
  };

  const onSubmit = (data) => {
    clearResults();
    dispatch(toggleIsLoading(true));
    fetchMovies(data);
  };

  return (
    <>
      <Form
        className="d-flex justify-content-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group as={Col} md="4">
          <Form.Control
            type="text"
            placeholder="Enter a movie title (example: Office Space)"
            {...register("title")}
            required
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="ms-2"
        >
          {isLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
          ) : (
            <Search className="me-2" />
          )}
          {isLoading ? "Loading..." : "Search"}
        </Button>
      </Form>
      <h5 className="mt-3" style={{ color: "red" }}>
        {searchError}
      </h5>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.movie.isLoading,
    searchError: state.movie.searchError,
  };
};

export default connect(mapStateToProps)(MovieSearchForm);

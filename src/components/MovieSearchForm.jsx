import React from "react";
import { useDispatch, connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import { Search } from "react-bootstrap-icons";
// Actions
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
  const { isLoading } = props;

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

  const onSubmit = (data) => {
    clearResults();
    dispatch(toggleIsLoading(true));
    if (data.Error) {
      dispatch(setSearchError(data.Error));
      dispatch(toggleIsLoading(false));
    }
    MovieAPI.getSeachResults(data.title).then((data) => {
      console.log(data);
      dispatch(setMovieResults(data.Search));
      dispatch(setTotalResultsCount(data.totalResults));
      dispatch(toggleIsLoading(false));
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form.Group as={Col} md="4">
          <Form.Control
            type="text"
            placeholder="Enter a movie title (e.g., Guardians of the Galaxy}"
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
      </div>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.movie.isLoading,
  };
};

export default connect(mapStateToProps)(MovieSearchForm);

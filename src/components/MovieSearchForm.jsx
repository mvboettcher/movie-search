import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import { Search } from "react-bootstrap-icons";

import { MovieAPI } from "../api/MovieAPI";

const schema = yup
  .object({
    title: yup.string().required(),
  })
  .required();

const MovieSearchForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = (data) => {
    setIsLoading(true);
    if (data.Error) {
      setError(data.Error);
      setIsLoading(false);
    }
    MovieAPI.getSeachResults(data.title).then((data) => {
      console.log(data);
      setSearchResults(data.Search);
      setTotalResults(data.totalResults);
      setIsLoading(false);
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

export default MovieSearchForm;

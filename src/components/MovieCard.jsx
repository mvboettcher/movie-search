import React from "react";
import Card from "react-bootstrap/Card";

const MovieCard = ({ movie }) => {
  const { Title, Year, Poster, Plot } = movie;
  return (
    <Card style={{ width: "30rem", padding: 0, border: "none" }}>
      <div
        style={{
          backgroundColor: "#212529",
          borderRadius: "0.375rem 0.375rem 0 0",
        }}
      >
        <Card.Img
          style={{ width: "16rem", borderRadius: 0 }}
          variant="top"
          src={Poster}
        />
      </div>
      <Card.Body
        className="border border-top-0"
        style={{
          borderRadius: "0 0 0.375rem 0.375rem",
          borderColor: "#d2d2d2",
        }}
      >
        <Card.Title>{`${Title} (${Year})`}</Card.Title>
        <Card.Text>{Plot}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;

import React from "react";
import LoadingBackdrop from "../LoadingBackDrop";
import Alert from "@mui/material/Alert";
import "./Banner.style.css";
import { Box } from "@mui/material";
import { useMoviesQuery } from "../../../hooks/useMovies";
import { useMovieDetailQuery } from "../../../hooks/useMovieDetail";

const Banner = ({ id = null }) => {
  const { data, isLoading, isError, error } = id
    ? useMovieDetailQuery(id)
    : useMoviesQuery("popular");

  // console.log("ddd", data);
  if (isLoading) {
    <LoadingBackdrop open={true} />;
  }
  if (isError) {
    <Alert severity="error">{error.message}</Alert>;
  }
  const movie = id ? data : data?.results?.[0];
  const posterPath = movie?.poster_path
    ? `https://media.themoviedb.org/t/p/w533_and_h300_bestv2${movie.poster_path}`
    : "/placeholder-banner.jpg";
  return (
    <div
      style={{
        backgroundImage: "url(" + `${posterPath}` + ")",
      }}
      className="banner"
    >
      <Box className="banner-text-area">
        <h1>{movie?.title}</h1>
        <p>{movie?.overview}</p>
      </Box>
    </div>
  );
};

export default Banner;

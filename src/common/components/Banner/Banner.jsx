import React from "react";
import LoadingBackdrop from "../LoadingBackDrop";
import Alert from "@mui/material/Alert";
import "./Banner.style.css";
import { Box, Button } from "@mui/material";
import { useMoviesQuery } from "../../../hooks/useMovies";
import { useMovieDetailQuery } from "../../../hooks/useMovieDetail";
import { useTrailerQuery } from "../../../hooks/useTrailer";

const Banner = ({ id = null }) => {
  const { data, isLoading, isError, error } = id
    ? useMovieDetailQuery(id)
    : useMoviesQuery("popular");

  // console.log("ddd", data);
  const movie = id ? data : data?.results?.[0];
  const { data: trailer } = useTrailerQuery(id || movie?.id);

  const handlePlayTrailer = () => {
    if (trailer) {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
    }
  };

  if (isLoading) {
    <LoadingBackdrop open={true} />;
  }
  if (isError) {
    <Alert severity="error">{error.message}</Alert>;
  }

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
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: "1rem", width: "fit-content" }}
          onClick={handlePlayTrailer}
        >
          예고편 보기
        </Button>
      </Box>
    </div>
  );
};

export default Banner;

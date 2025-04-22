import React from "react";
import LoadingBackdrop from "../../../../common/components/LoadingBackDrop";
import Alert from "@mui/material/Alert";
import "./Banner.style.css";
import { Box } from "@mui/material";
import { useMoviesQuery } from "../../../../hooks/useMovies";

const Banner = () => {
  const { data, isLoading, isError, error } = useMoviesQuery("popular");
  console.log("ddd", data);
  if (isLoading) {
    <LoadingBackdrop open={true} />;
  }
  if (isError) {
    <Alert severity="error">{error.message}</Alert>;
  }
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w533_and_h300_bestv2${data?.results[0].poster_path}` +
          ")",
      }}
      className="banner"
    >
      <Box className="banner-text-area">
        <h1>{data?.results[0].title}</h1>
        <p>{data?.results[0].overview}</p>
      </Box>
    </div>
  );
};

export default Banner;

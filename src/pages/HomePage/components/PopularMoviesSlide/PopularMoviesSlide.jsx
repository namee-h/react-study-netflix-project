import React from "react";
import LoadingBackdrop from "../../../../common/components/LoadingBackDrop";
import { Alert } from "@mui/material";
import MoviesSlider from "../../../../common/MoviesSlider/MoviesSlider";
import { responsive } from "../../../../constants/responsive";
import { useMoviesQuery } from "../../../../hooks/useMovies";

const PopularMoviesSlide = () => {
  const { data, isLoading, isError, error } = useMoviesQuery("popular");
  if (isLoading) {
    return <LoadingBackdrop open={true} />;
  }
  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return (
    <div>
      <MoviesSlider
        title="Popular Movies"
        movies={data.results}
        responsive={responsive}
        variant="ranked"
      />
    </div>
  );
};

export default PopularMoviesSlide;

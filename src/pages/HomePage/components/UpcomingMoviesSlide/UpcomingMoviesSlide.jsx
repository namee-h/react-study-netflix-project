import React from "react";
import LoadingBackdrop from "../../../../common/components/LoadingBackDrop";
import { Alert } from "@mui/material";
import MoviesSlider from "../../../../common/MoviesSlider/MoviesSlider";
import { responsive } from "../../../../constants/responsive";
import { useMoviesQuery } from "../../../../hooks/useMovies";

const UpcomingMoviesSlide = () => {
  const { data, isLoading, isError, error } = useMoviesQuery("upcoming");
  if (isLoading) {
    return <LoadingBackdrop open={true} />;
  }
  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <div>
      <MoviesSlider
        title="Upcoming Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMoviesSlide;

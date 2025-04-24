import React from "react";
import { Box } from "@mui/material";
import MoviesSlider from "../../../common/MoviesSlider/MoviesSlider";
import { responsive } from "../../../constants/responsive";

const RelatedMoviesSlide = ({ movies }) => {
  return (
    <Box>
      <MoviesSlider
        title="Related Movies"
        movies={movies}
        responsive={responsive}
        type="list"
      />
    </Box>
  );
};

export default RelatedMoviesSlide;

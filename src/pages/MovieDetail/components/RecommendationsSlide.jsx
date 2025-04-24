import React from "react";
import MoviesSlider from "../../../common/MoviesSlider/MoviesSlider";
import { responsive } from "../../../constants/responsive";

const RecommendationsSlide = ({ movies }) => {
  return (
    <div>
      <MoviesSlider
        title="Recommendations Movies"
        movies={movies}
        responsive={responsive}
        type="list"
      />
    </div>
  );
};

export default RecommendationsSlide;

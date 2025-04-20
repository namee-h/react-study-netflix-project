import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import LoadingBackdrop from "../../../../common/components/LoadingBackDrop";
import { Alert } from "@mui/material";
import MovieCard from "../MovieCard/MovieCard";
import "../PopularMoviesSlide/popularMoviesSlide.style.css";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const TopRatedMoviesSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();
  if (isLoading) {
    return <LoadingBackdrop open={true} />;
  }
  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <div>
      <h3 className="movie-list-category-title">Top Rated Movies</h3>
      <Carousel
        responsive={responsive}
        infinite={true}
        centerMode={true}
        itemClass="movies-slider p-1"
        containerClass="carousel-container"
      >
        {data.results.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default TopRatedMoviesSlide;

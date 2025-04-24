import React from "react";
import "./moviesSlider.style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../components/MovieCard/MovieCard";

const MoviesSlider = ({ title, movies, responsive, type = "default" }) => {
  return (
    <div>
      <h3 className="movie-list-category-title">{title}</h3>
      <Carousel
        responsive={responsive}
        infinite={true}
        centerMode={true}
        itemClass="movies-slider p-1"
        containerClass="carousel-container"
      >
        {movies.map((movie, index) => (
          <MovieCard
            movie={movie}
            key={index}
            rank={index + 1}
            variant={type}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default MoviesSlider;

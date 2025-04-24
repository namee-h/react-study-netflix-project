import React from "react";
import Banner from "../../common/components/Banner/Banner";
import MovieDetailBox from "./components/MovieDetailBox";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useRecommendationsQuery } from "../../hooks/useRecommendations";
import { Alert } from "@mui/material";
import LoadingBackdrop from "../../common/components/LoadingBackDrop";
import GoBackButton from "../../common/components/Buttons/GoBackButton";
import ScrollTopButton from "../../common/components/Buttons/ScrollTopButton";
import RelatedMoviesSlide from "./components/RelatedMoviesSlide";
import RecommendationsSlide from "./components/RecommendationsSlide";
import { useSimilarMoviesQuery } from "../../hooks/useSimilarMovies";
import Reviews from "./components/Reviews/Reviews";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieDetailQuery(id);
  const related = useSimilarMoviesQuery(id);
  const recommended = useRecommendationsQuery(id);

  if (isLoading || related.isLoading || recommended.isLoading) {
    return <LoadingBackdrop open={true} />;
  }
  if (isError || related.isError || recommended.isError) {
    return <Alert severity="error">{error?.message}</Alert>;
  }

  return (
    <div>
      <Banner id={id} />
      <MovieDetailBox movie={data} />
      {related.data && related.data.results.length > 0 ? (
        <RelatedMoviesSlide movies={related.data.results} />
      ) : recommended.data && recommended.data.results.length > 0 ? (
        <RecommendationsSlide movies={recommended.data.results} />
      ) : null}
      <Reviews id={id} />
      <GoBackButton />
      <ScrollTopButton />
    </div>
  );
};

export default MovieDetailPage;

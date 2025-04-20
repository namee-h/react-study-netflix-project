import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMoviesSlide from "./components/PopularMoviesSlide/PopularMoviesSlide";
import TopRatedMoviesSlide from "./components/TopRatedMoviesSlide/TopRatedMoviesSlide";
import UpcomingMoviesSlide from "./components/UpcomingMoviesSlide/UpcomingMoviesSlide";

// 1.배너 =>popular movie를 들고와서 첫번째 아이템 보여주기
// 2.popular movie
// 3.rop rated movie
// 4.upcoming movie
const HomePage = () => {
  return (
    <div>
      <Banner />
      <PopularMoviesSlide />
      <TopRatedMoviesSlide />
      <UpcomingMoviesSlide />
    </div>
  );
};

export default HomePage;

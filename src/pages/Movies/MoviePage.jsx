import React from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import LoadingBackdrop from "../../common/components/LoadingBackDrop";
import { Alert, Box, Container, Grid } from "@mui/material";
import MovieCard from "../../common/components/MovieCard/MovieCard";

// 경로 2가지
// nav바에서 클릭해서 온 경우 => popularMovie 보여주기
// keyword를 입력해서 온 경우  => keyword 와 관련된 영화들을 보여줌

// 페이지네이션 설치
// 페이지 state 만들기
// 페이지네이션 클릭시 페이지바꿔주기
// 페이지값이 바뀔때마다 useSearchMovie에 페이지까지 넣어서 fetch
const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword });
  console.log("moviepage", data);
  if (isLoading) {
    return <LoadingBackdrop open={true} />;
  }
  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return (
    <Container className="borders" maxWidth="xl" sx={{ marginTop: "2em" }}>
      <Grid container sx={{ width: "100%" }} spacing={1}>
        <Grid item lg={4} className="borders" width="29%">
          <Box width="100%">필터</Box>
        </Grid>

        <Grid item lg={8} className="borders" width="69%">
          <Box width="100%">
            <Grid container spacing={2} justifyContent="center">
              {data.results.map((movie, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <MovieCard movie={movie} variant="list" />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MoviePage;

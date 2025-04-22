import React, { useEffect, useState } from "react";
import "./MoviePage.style.css";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import LoadingBackdrop from "../../common/components/LoadingBackDrop";
import {
  Alert,
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import MovieCard from "../../common/components/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import SortFilter from "./components/SortFilter/SortFilter";

// 경로 2가지
// nav바에서 클릭해서 온 경우 => popularMovie 보여주기
// keyword를 입력해서 온 경우  => keyword 와 관련된 영화들을 보여줌

// 페이지네이션 설치
// 페이지 state 만들기
// 페이지네이션 클릭시 페이지바꿔주기
// 페이지값이 바뀔때마다 useSearchMovie에 페이지까지 넣어서 fetch
const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("popularity.desc");
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = query.get("q");

  useEffect(() => {
    setPage(1);
    setSortOption("popularity.desc");
  }, [keyword]);

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    sortOption,
  });
  const handleSortChange = (e) => {
    const sortSelected = e.target.value;
    setSortOption(sortSelected);
    setPage(1);

    const params = new URLSearchParams(searchParams);
    params.set("sort", sortSelected);
    setSearchParams(params);
  };
  const handlePageClick = ({ selected }) => {
    console.log("zmfflr?");
    setPage(selected + 1);
  };
  console.log("moviepage", data);
  if (isLoading) {
    return <LoadingBackdrop open={true} />;
  }
  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  // 😭 검색값있을때 정렬
  const sortedResults = keyword
    ? [...data.results].sort((a, b) => {
        if (sortOption === "popularity.desc")
          return b.popularity - a.popularity;
        if (sortOption === "popularity.asc") return a.popularity - b.popularity;
        return 0;
      })
    : data.results;

  return (
    <Container sx={{ margin: "1em auto", padding: "0" }}>
      <Grid
        container
        spacing={1}
        sx={{ width: "100%", justifyContent: "center" }}
      >
        <Grid margin="1em auto" padding="1em 0" size={{ sm: 12, md: 3 }}>
          <Box width="100%">
            <SortFilter
              sortOption={sortOption}
              setSortOption={setSortOption}
              handleSortChange={handleSortChange}
            />
          </Box>
        </Grid>

        <Grid margin="1em auto" padding="1em 0" size={{ sm: 12, md: 9 }}>
          <Box width="100%">
            <Grid container spacing={2}>
              {sortedResults.map((movie, index) => (
                <Grid
                  size={{ xs: 12, sm: 4, lg: 3 }}
                  justifyItems="center"
                  key={index}
                >
                  <MovieCard movie={movie} variant="list" />
                </Grid>
              ))}
            </Grid>

            <ReactPaginate
              pageCount={data?.total_pages} //전체페이지 몇개인지
              pageRangeDisplayed={3} //중앙페이지수
              marginPagesDisplayed={0}
              onPageChange={handlePageClick}
              forcePage={page - 1} // react-paginate 는 page를 0부터 카운터함
              previousLabel={page !== 1 ? "<" : null} //previous
              nextLabel={page !== data.total_pages ? ">" : null} //next
              breakLabel={null}
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName={`page-item previous ${
                page !== 1 ? "" : "disabled"
              }`}
              previousLinkClassName="page-link"
              nextClassName={`page-item next ${
                page !== data.totalPages ? "" : "disabled"
              }`}
              nextLinkClassName="page-link"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MoviePage;

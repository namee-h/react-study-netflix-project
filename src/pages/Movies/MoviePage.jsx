import React, { useEffect, useState } from "react";
import "./MoviePage.style.css";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import LoadingBackdrop from "../../common/components/LoadingBackDrop";
import { Alert, Box, Container, Grid } from "@mui/material";
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

  if (isLoading) {
    return <LoadingBackdrop open={true} />;
  }
  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  const handleSortChange = (e) => {
    const sortSelected = e.target.value;
    setSortOption(sortSelected);
    setPage(1);

    const params = new URLSearchParams(searchParams);
    params.set("sort", sortSelected);
    setSearchParams(params);
  };
  const handlePageClick = ({ selected }) => {
    console.log("Clicked page:", selected + 1);
    setPage(selected + 1);
    // setCurrentPageForPaginate(selected);
  };
  console.log("moviepage", data);

  // 😭 검색값있을때 정렬
  const sortedResults = keyword
    ? [...data.results].sort((a, b) => {
        if (sortOption === "popularity.desc")
          return b.popularity - a.popularity;
        if (sortOption === "popularity.asc") return a.popularity - b.popularity;
        return 0;
      })
    : data.results;

  const safeTotalPages = data.total_pages > 100 ? 100 : data.total_pages;

  return (
    <Container sx={{ margin: "1em auto", padding: "0" }}>
      {sortedResults.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="300px"
          width="100%"
        >
          <Alert
            severity="info"
            sx={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              backgroundColor: "#333",
              color: "red",
              border: "1px solid red",
              borderRadius: 1,
              padding: "12px 16px",
            }}
          >
            No results found. Try another search!
          </Alert>
        </Box>
      ) : (
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

          <Grid margin="1em auto" padding="1em auto" size={{ sm: 12, md: 9 }}>
            <Box width="100%">
              <Grid
                container
                spacing={2}
                justifyContent="center"
                marginBottom="1em"
              >
                {sortedResults.map((movie, index) => (
                  <Grid
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    sx={{ display: "flex", justifyContent: "center" }}
                    key={index}
                  >
                    <Box>
                      <MovieCard movie={movie} variant="list" />
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1em 0",
                  maxWidth: "100%",
                  overflowX: "auto",
                }}
              >
                <ReactPaginate
                  pageCount={safeTotalPages} //전체페이지 몇개인지
                  pageRangeDisplayed={2} //중앙페이지수
                  marginPagesDisplayed={1}
                  onPageChange={handlePageClick}
                  onClick={(e) => {
                    console.log("ReactClicked page:", e.selected);
                  }}
                  forcePage={page - 1} // react-paginate 는 page를 0부터 카운터함
                  previousLabel="<" //previous
                  nextLabel=">" //next
                  breakLabel="..."
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
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default MoviePage;

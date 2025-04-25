import React, { useEffect, useState } from "react";
import "./MoviePage.style.css";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import LoadingBackdrop from "../../common/components/LoadingBackDrop";
import {
  Alert,
  Box,
  Container,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import MovieCard from "../../common/components/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import SortFilter from "./components/SortFilter/SortFilter";
import GenreFilter from "./components/GenreFilter/GenreFilter";
import ScrollTopButton from "../../common/components/Buttons/ScrollTopButton";
import GoBackButton from "../../common/components/Buttons/GoBackButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const MoviePage = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
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
    genres: selectedGenres,
  });

  if (isLoading) return <LoadingBackdrop open={true} />;
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  const handleSortChange = (e) => {
    const sortSelected = e.target.value;
    setSortOption(sortSelected);
    setPage(1);

    const params = new URLSearchParams(searchParams);
    params.set("sort", sortSelected);
    setSearchParams(params, { replace: true });
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const sortedResults = [...(data?.results || [])]
    .filter(Boolean)
    .sort((a, b) => {
      switch (sortOption) {
        case "popularity.desc":
          return b.popularity - a.popularity;
        case "popularity.asc":
          return a.popularity - b.popularity;
        case "vote_average.desc":
          return b.vote_average - a.vote_average;
        case "vote_average.asc":
          return a.vote_average - b.vote_average;
        case "vote_count.desc":
          return b.vote_count - a.vote_count;
        case "vote_count.asc":
          return a.vote_count - b.vote_count;
        default:
          return 0;
      }
    });

  const filteredResults = selectedGenres.length
    ? sortedResults.filter((movie) =>
        movie.genre_ids?.some((id) => selectedGenres.includes(id))
      )
    : sortedResults;

  const itemsPerPage = 20;

  const safeTotalPages = selectedGenres.length
    ? Math.ceil(filteredResults.length / itemsPerPage)
    : data.total_pages > 100
    ? 100
    : data.total_pages;

  const pagedResults = selectedGenres.length
    ? filteredResults.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : sortedResults;

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    params.set("page", 1);
    setSearchParams(params);
  };

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
            {keyword && (
              <div className="keyword-area">
                <div>search : {keyword}</div>
                <Box
                  mb={1}
                  sx={{ position: "absolute", right: "2px", top: "2px" }}
                >
                  <Tooltip title="Clear search">
                    <IconButton
                      onClick={clearSearch}
                      sx={{
                        backgroundColor: "#111",
                        color: "white",
                        "&:hover": { backgroundColor: "#b30000" },
                        borderRadius: "8px",
                      }}
                    >
                      <RestartAltIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </div>
            )}
            <Box width="100%">
              <Box marginBottom="1em">
                <SortFilter
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                  handleSortChange={handleSortChange}
                />
              </Box>
              <Box marginBottom="1em">
                <GenreFilter
                  selectedGenres={selectedGenres}
                  setSelectedGenres={setSelectedGenres}
                />
              </Box>
            </Box>
          </Grid>

          <Grid margin="1em auto" padding="1em auto" size={{ sm: 12, md: 9 }}>
            <Box width="100%">
              <Grid
                container
                spacing={2}
                justifyContent="center"
                marginBottom="1em 0"
              >
                {pagedResults.map((movie, index) => (
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
                  pageCount={safeTotalPages}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                  onPageChange={handlePageClick}
                  forcePage={page - 1}
                  previousLabel="<"
                  nextLabel=">"
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
      <GoBackButton />
      <ScrollTopButton />
    </Container>
  );
};

export default MoviePage;

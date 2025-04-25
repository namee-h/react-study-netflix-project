import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, sortOption, genres }) => {
  if (keyword) {
    return api.get(
      `/search/movie?query=${encodeURIComponent(keyword)}&page=${page}`
    );
  }

  const sortQuery = sortOption ? `&sort_by=${sortOption}` : "";
  const genreQuery = genres?.length ? `&with_genres=${genres.join(",")}` : "";

  return api.get(`/discover/movie?page=${page}${sortQuery}${genreQuery}`);
};

export const useSearchMovieQuery = ({ keyword, page, sortOption, genres }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, sortOption, genres }],
    queryFn: () => fetchSearchMovie({ keyword, page, sortOption, genres }),
    select: (result) => result.data,
  });
};
// import { useQuery } from "@tanstack/react-query";
// import api from "../utils/api";

// const fetchSearchMovie = ({ keyword, page, sortOption }) => {
//   const sortQuery = sortOption ? sortOption : "";
//   if (keyword) {
//     return api.get(`/search/movie?query=${keyword}&page=${page}`);
//   } else {
//     return api.get(`/discover/movie?page=${page}&sort_by=${sortQuery}`);
//   }
// };

// export const useSearchMovieQuery = ({ keyword, page, sortOption }) => {
//   return useQuery({
//     queryKey: ["movie-search", { keyword, page, sortOption }],
//     queryFn: () => fetchSearchMovie({ keyword, page, sortOption }),
//     select: (result) => result.data,
//     staleTime: 1000 * 60 * 5,
//     keepPreviousData: true,
//   });
// };

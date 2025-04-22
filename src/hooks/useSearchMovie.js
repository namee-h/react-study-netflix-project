import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, sortOption }) => {
  const sortQuery = sortOption ? sortOption : "";
  if (keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}`);
  } else {
    return api.get(`/discover/movie?page=${page}&sort_by=${sortQuery}`);
  }
};

export const useSearchMovieQuery = ({ keyword, page = 1, sortOption }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, sortOption }],
    queryFn: () => fetchSearchMovie({ keyword, page, sortOption }),
    select: (res) => res.data,
  });
};

import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const ENDPOINTS = {
  popular: "/movie/popular",
  topRated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
};

export const useMoviesQuery = (type) => {
  return useQuery({
    queryKey: [`movie-${type}`, type],
    queryFn: () => api.get(ENDPOINTS[type]),
    select: (res) => res.data,
    enabled: Boolean(type && ENDPOINTS[type]),
  });
};

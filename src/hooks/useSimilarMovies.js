import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useSimilarMoviesQuery = (id) => {
  return useQuery({
    queryKey: ["movie-Similar", id],
    queryFn: () => api.get(`/movie/${id}/similar`),
    select: (res) => res.data,
    enabled: !!id,
  });
};

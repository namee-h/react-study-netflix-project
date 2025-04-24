import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useMovieDetailQuery = (id) => {
  return useQuery({
    queryKey: ["movie-detail", id],
    queryFn: () => api.get(`/movie/${id}`),
    select: (res) => res.data,
    enabled: !!id,
  });
};

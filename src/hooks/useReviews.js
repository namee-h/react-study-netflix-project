import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useReviewsQuery = (id) => {
  return useQuery({
    queryKey: ["movie-reviews", id],
    queryFn: () => api.get(`/movie/${id}/reviews`),
    select: (res) => res.data,
    enabled: !!id,
  });
};

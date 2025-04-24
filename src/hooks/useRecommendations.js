import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

export const useRecommendationsQuery = (id) => {
  return useQuery({
    queryKey: ["recommendation", id],
    queryFn: () => api.get(`/movie/${id}/recommendations`),
    select: (res) => res.data,
    enabled: !!id,
  });
};

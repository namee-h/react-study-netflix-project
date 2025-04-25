import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTrailer = async (id) => {
  if (!id) return [];
  const res = await api.get(`/movie/${id}/videos`);
  return res.data.results;
};

export const useTrailerQuery = (id) => {
  return useQuery({
    queryKey: ["movie-trailer", id],
    queryFn: () => fetchTrailer(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
};

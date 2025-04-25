import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTrailer = async (id) => {
  const res = await api.get(`/movie/${id}/videos`);
  const videos = res.data.results;
  return videos.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );
};

export const useTrailerQuery = (id) => {
  return useQuery({
    queryKey: ["movie-trailer", id],
    queryFn: () => fetchTrailer(id),
    staleTime: 1000 * 60 * 10, // 10분 캐싱
  });
};

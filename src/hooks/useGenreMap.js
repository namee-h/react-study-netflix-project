import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useGenreStore } from "../store/genreStore";
const fetchGenre = async () => {
  const res = await api.get(`/genre/movie/list`);
  const genres = res.data.genres;

  const genreMap = {};
  genres.forEach((genre) => {
    genreMap[genre.id] = genre.name;
  });

  useGenreStore.getState().setGenreMap(genreMap); // ✅ zustand 상태 저장!

  return genreMap;
};

export const useGenreMap = () => {
  return useQuery({
    queryKey: ["movie-genre"],
    queryFn: fetchGenre,
    staleTime: 1000 * 60 * 60,
  });
};

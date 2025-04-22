import React from "react";
import GenreBadge from "./Chip";
import { Box, Chip, Stack, Typography, useMediaQuery } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AllAgeIcon from "./Icons/AllAgeIcon";
import Age18PlusIcon from "./Icons/Age18PlusIcon";
import ForumIcon from "@mui/icons-material/Forum";
import { useGenreStore } from "../../../store/genreStore";
import "./movieCard.style.css";

const MovieCard = ({ movie, rank, variant = "default" }) => {
  const genreMap = useGenreStore((state) => state.genreMap);
  const isMobile = useMediaQuery("(max-width:465px)");

  const genreNames = movie.genre_ids.map((id) => genreMap[id]).filter(Boolean);
  const displayedGenres = isMobile ? genreNames.slice(0, 3) : genreNames;
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` +
          ")",
        borderRadius: "8px",
        position: "relative",
      }}
      className={`movie-card ${variant === "ranked" ? "with-rank" : ""}`}
    >
      {variant === "ranked" && <div className="rank-layer">{rank}</div>}
      <div className="overlay">
        <Stack>
          <h2>{movie.title}</h2>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {displayedGenres.map((genre) => (
              <GenreBadge key={genre} genre={genre} />
            ))}
            {isMobile && genreNames.length > 3 && (
              <Chip
                label={`+${genreNames.length - 3}`}
                size="small"
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "gray",
                  fontSize: "0.7rem",
                  height: "24px",
                }}
              />
            )}
          </Box>
        </Stack>
        <Stack>
          <Box display="flex" alignItems="center" gap={0.5}>
            <WhatshotIcon sx={{ fontSize: 16, color: "orangered" }} />
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {movie.popularity}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <StarIcon sx={{ fontSize: 16, color: "gold" }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {Math.floor(movie.vote_average * 10) / 10}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <ForumIcon sx={{ fontSize: 16, color: "gray" }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {movie.vote_count}
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            right: "10px",
          }}
        >
          {movie.adult ? (
            <Age18PlusIcon fontSize="small" />
          ) : (
            <AllAgeIcon fontSize="small" />
          )}
        </Box>
      </div>
    </div>
  );
};

export default MovieCard;

import React, { useEffect, useState } from "react";
import GenreBadge from "./Chip";
import { Box, Chip, Stack, Typography, useMediaQuery } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AllAgeIcon from "./Icons/AllAgeIcon";
import Age18PlusIcon from "./Icons/Age18PlusIcon";
import ForumIcon from "@mui/icons-material/Forum";
import { useGenreStore } from "../../../store/genreStore";
import "./movieCard.style.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, rank, variant = "default" }) => {
  const [bgImage, setBgImage] = useState("");
  const genreMap = useGenreStore((state) => state.genreMap);
  const isMobile = useMediaQuery("(max-width:465px)");
  const [mainTitle, subTitle] = movie.title.split(/:(.+)/); // 첫 번째 ':' 기준으로 분리
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    const posterUrl = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`;
    const fallbackUrl = "/placeholder.png";

    img.src = posterUrl;
    img.onload = () => setBgImage(posterUrl); // 성공 시 포스터 사용
    img.onerror = () => setBgImage(fallbackUrl); // 실패 시 대체 이미지
  }, [movie.poster_path]);
  // const [imgSrc, setImgSrc] = useState(
  //   movie.poster_path
  //     ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`
  //     : "/placeholder.png"
  // );
  // const handleImageError = () => {
  //   setImgSrc("/placeholder.png");
  // };

  const handleClickToDetail = () => {
    navigate(`/movies/${movie.id}`);
  };
  const genreNames = (movie.genre_ids || [])
    .map((id) => genreMap[id])
    .filter(Boolean);
  const displayedGenres =
    variant === "list"
      ? genreNames.slice(0, 3)
      : isMobile
      ? genreNames.slice(0, 3)
      : genreNames;

  return (
    <div
      onClick={handleClickToDetail}
      className={`movie-card ${variant} ${
        variant === "ranked" ? "with-rank" : ""
      }`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
        borderRadius: "8px",
        cursor: "pointer",
        border: "2px solid #fff",
      }}
    >
      {/* ✅ 이미지 태그로 변경
      <img
        className="movie-image"
        src={imgSrc}
        alt={movie.title}
        onError={handleImageError}
        loading="lazy"
      /> */}
      {variant === "ranked" && <div className="rank-layer">{rank}</div>}
      <div className="overlay">
        <Stack>
          {variant === "list" && (
            <Stack sx={{ margin: "1em 0" }}>
              <Typography variant="h5" fontWeight="bold">
                {mainTitle}
              </Typography>
              {subTitle && (
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {subTitle}
                </Typography>
              )}
            </Stack>
          )}
          {variant !== "list" && <h2>{movie.title}</h2>}

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
              {typeof movie.popularity === "number"
                ? movie.popularity.toFixed(1)
                : "No data"}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <StarIcon sx={{ fontSize: 16, color: "gold" }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {typeof movie.vote_average === "number"
                  ? Math.floor(movie.vote_average * 10) / 10
                  : "No data"}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <ForumIcon sx={{ fontSize: 16, color: "gray" }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {typeof movie.vote_count === "number" ? movie.vote_count : 0}
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

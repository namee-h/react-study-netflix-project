import React from "react";
import Container from "@mui/material/Container";
import { Box, Grid, Typography, Chip, Divider, Stack } from "@mui/material";
import GenreBadge from "../../../common/components/MovieCard/Chip";
import {
  AccessTime,
  CalendarToday,
  MonetizationOn,
  EmojiEvents,
} from "@mui/icons-material";
import Age18PlusIcon from "../../../common/components/MovieCard/Icons/Age18PlusIcon";
import AllAgeIcon from "../../../common/components/MovieCard/Icons/AllAgeIcon";

const MovieDetailBox = ({ movie }) => {
  console.log("detail", movie);
  return (
    <Box sx={{ backgroundColor: "black", color: "white", py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Poster */}
          <Grid size={{ xs: 12, md: 5 }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt={movie?.title}
              style={{ width: "100%", borderRadius: "12px" }}
            />
          </Grid>

          {/* Movie Info */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
              {movie.genres.map((g, index) => (
                <GenreBadge key={index} genre={g.name} />
              ))}
            </Stack>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {movie.title}
              </Typography>
              <Chip
                label={movie.adult ? <Age18PlusIcon /> : <AllAgeIcon />}
                size="small"
              />
            </Box>

            {movie.tagline && (
              <Typography variant="subtitle1" color="gray" mb={2}>
                {movie.tagline}
              </Typography>
            )}

            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <EmojiEvents sx={{ color: "gold" }} />
              <Typography>
                {movie.vote_average} / {movie.vote_count.toLocaleString()} votes
              </Typography>
              <MonetizationOn sx={{ color: "orange" }} />
              <Typography>${movie.revenue.toLocaleString()}</Typography>
              <AccessTime sx={{ color: "white" }} />
              <Typography>{movie.runtime}분</Typography>
            </Stack>

            <Typography variant="body1" paragraph>
              {movie.overview}
            </Typography>

            <Divider sx={{ my: 2, backgroundColor: "#444" }} />

            <Stack spacing={1}>
              <Typography>
                <strong>Budget:</strong> ${movie.budget.toLocaleString()}
              </Typography>
              <Typography>
                <strong>Release Date:</strong> {movie.release_date}
              </Typography>
              <Typography>
                <strong>Status:</strong> {movie.status}
              </Typography>
              {movie.homepage && (
                <Typography>
                  <strong>Homepage:</strong>{" "}
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "skyblue" }}
                  >
                    {movie.homepage}
                  </a>
                </Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MovieDetailBox;

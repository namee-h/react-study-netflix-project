import React, { useMemo, useState } from "react";
import LoadingBackdrop from "../LoadingBackDrop";
import Alert from "@mui/material/Alert";
import "./Banner.style.css";
import { Box, Button, Modal } from "@mui/material";
import { useMoviesQuery } from "../../../hooks/useMovies";
import { useMovieDetailQuery } from "../../../hooks/useMovieDetail";
import { useTrailerQuery } from "../../../hooks/useTrailer";

const Banner = ({ id = null }) => {
  const [open, setOpen] = useState(false);

  const movieQuery = id ? useMovieDetailQuery(id) : useMoviesQuery("popular");

  // console.log("ddd", data);
  const { data, isLoading, isError, error } = movieQuery;

  const movie = useMemo(() => {
    if (!data) return null;
    return id ? data : data.results?.[0];
  }, [data, id]);

  const { data: videos } = useTrailerQuery(movie?.id, {
    enabled: !!movie?.id,
  });

  const trailer = videos?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  const handlePlayTrailer = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (isLoading) {
    <LoadingBackdrop open={true} />;
  }
  if (isError) {
    <Alert severity="error">{error.message}</Alert>;
  }

  const posterPath = movie?.poster_path
    ? `https://media.themoviedb.org/t/p/w533_and_h300_bestv2${movie.poster_path}`
    : "/placeholder-banner.jpg";
  return (
    <div
      style={{
        backgroundImage: "url(" + `${posterPath}` + ")",
      }}
      className="banner"
    >
      <Box className="banner-text-area">
        <h1>{movie?.title}</h1>
        <p>{movie?.overview}</p>
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: "1rem", width: "fit-content" }}
          onClick={handlePlayTrailer}
        >
          예고편 보기
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "768px",
            bgcolor: "black",
            border: "2px solid red",
            boxShadow: 24,
            p: 1,
          }}
        >
          {trailer ? (
            <iframe
              width="100%"
              height="400px"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <Box sx={{ color: "white", textAlign: "center", padding: 2 }}>
              예고편이 없습니다.
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Banner;

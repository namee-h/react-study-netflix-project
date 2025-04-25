import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGenreStore } from "../../../../store/genreStore";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const GenreFilter = ({ selectedGenres, setSelectedGenres }) => {
  const genreMap = useGenreStore((state) => state.genreMap);

  const handleChange = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((gid) => gid !== id) : [...prev, id]
    );
  };
  const clearGenres = () => {
    setSelectedGenres([]);
  };
  return (
    <Accordion
      sx={{
        backgroundColor: "#111",
        color: "#fff",
        position: "relative",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
        aria-controls="genre-content"
        id="genre-header"
      >
        <Typography fontWeight="bold">
          Genre Filter{" "}
          {selectedGenres.length > 0 && (
            <span style={{ color: "#999", fontSize: "0.9rem" }}>
              ({selectedGenres.length} selected)
            </span>
          )}
        </Typography>
      </AccordionSummary>
      <Box mb={1} sx={{ position: "absolute", right: "50px", top: "10px" }}>
        <Tooltip title="Clear selected genres">
          <IconButton
            onClick={clearGenres}
            sx={{
              backgroundColor: "#111",
              color: "white",
              "&:hover": {
                backgroundColor: "#b30000",
              },
              borderRadius: "8px",
            }}
          >
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <AccordionDetails>
        <FormGroup>
          {Object.entries(genreMap).map(([id, name]) => (
            <FormControlLabel
              key={id}
              control={
                <Checkbox
                  checked={selectedGenres.includes(Number(id))}
                  onChange={() => handleChange(Number(id))}
                  sx={{
                    "&.Mui-checked .MuiSvgIcon-root": {
                      backgroundColor: "white",
                      color: "red",
                      borderRadius: "4px",
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    backgroundColor: selectedGenres.includes(Number(id))
                      ? "red"
                      : "transparent",
                    color: selectedGenres.includes(Number(id))
                      ? "white"
                      : "inherit",
                    padding: "0.2em 0.5em",
                    borderRadius: "4px",
                    transition: "0.2s ease",
                    fontWeight: selectedGenres.includes(Number(id))
                      ? "bold"
                      : "normal",
                  }}
                >
                  {name}
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default GenreFilter;

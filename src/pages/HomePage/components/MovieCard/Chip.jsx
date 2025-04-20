import Chip from "@mui/material/Chip";
import "./movieCard.style.css";

function GenreBadge({ genre }) {
  return (
    <Chip
      label={genre}
      variant="outlined"
      color="secondary"
      size="small"
      sx={{
        fontWeight: "bold",
        borderRadius: "8px",
        px: 1.5,
        textTransform: "capitalize",
        border: "1px solid red",
        color: "white",
        backgroundColor: "red",
      }}
    />
  );
}

export default GenreBadge;

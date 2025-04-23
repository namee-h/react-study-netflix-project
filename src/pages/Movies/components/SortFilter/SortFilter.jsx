import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";

const SortFilter = ({ sortOption, handleSortChange }) => {
  return (
    <Box sx={{ minWidth: 160, maxWidth: 280 }}>
      <FormControl fullWidth size="small">
        <InputLabel
          id="sort-select-label"
          sx={{
            color: "#e5e5e5",
            "&.Mui-focused": {
              color: "#fff",
              fontWeight: "bolder",
            },
          }}
        >
          Sort by
        </InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sortOption}
          onChange={handleSortChange}
          label="정렬 기준"
          sx={{
            backgroundColor: "#111",
            color: "#fff",
            borderRadius: 1,
            fontSize: "1rem",
            fontWeight: "bolder",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#555",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e50914",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e50914",
            },
            "& .MuiSvgIcon-root": {
              color: "#fff",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "#111", // 드롭다운 배경
                color: "#fff", // 메뉴 항목 텍스트
              },
            },
          }}
        >
          <MenuItem value="popularity.desc">Most Popular</MenuItem>
          <MenuItem value="popularity.asc">Least Popular</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortFilter;

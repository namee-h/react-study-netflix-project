import React, { useState } from "react";
import { Box, Typography, Button, Collapse, Grid } from "@mui/material";

const ReviewBox = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const content = review?.content || "";
  const preview = content.slice(0, 300); // 미리보기 텍스트

  //   console.log("review", review);
  if (!content) return null;

  return (
    <Grid container>
      <Box
        sx={{
          border: "2px solid red",
          borderRadius: 2,
          padding: 2,
          marginBottom: 2,
          color: "white",
          backgroundColor: "#111",
          width: "100%",
        }}
      >
        <Typography fontWeight="bold" gutterBottom>
          {review?.author}
        </Typography>

        {/* collapse 처리된 전체 내용 */}
        <Collapse in={expanded}>
          <Typography
            variant="body2"
            sx={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
          >
            {review?.content}
          </Typography>
        </Collapse>

        {/* 줄인 내용은 collapse=false일 때만 보여줘 */}
        {!expanded && (
          <Typography
            variant="body2"
            sx={{
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {preview}
            {review?.content.length > 300 && "..."}
          </Typography>
        )}

        {/* 더보기 버튼 */}
        {review?.content.length > 300 && (
          <Button
            variant="text"
            onClick={() => setExpanded(!expanded)}
            sx={{ color: "white", marginTop: 1 }}
          >
            {expanded ? "접기" : "더보기"}
          </Button>
        )}
      </Box>
    </Grid>
  );
};

export default ReviewBox;

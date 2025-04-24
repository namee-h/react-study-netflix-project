import React from "react";
import { useReviewsQuery } from "../../../../hooks/useReviews";
import "./Reviews.style.css";
import ReviewBox from "./component/ReviewBox";
import { Container } from "@mui/material";

const Reviews = ({ id }) => {
  const { data } = useReviewsQuery(id);
  const reviews = data?.results || [];
  // console.log("reviews", data);
  return (
    <div>
      <Container>
        <h3 className="title">Reviews</h3>
        {reviews.length === 0 ? (
          <p style={{ color: "white" }}>No reviews available.</p>
        ) : (
          reviews.map((review) => <ReviewBox key={review.id} review={review} />)
        )}
      </Container>
    </div>
  );
};

export default Reviews;

import { styled } from "~/stitches.config";

export const QuizCard = styled("li", {
  cursor: "default",
  backgroundColor: "$gray100",
  borderRadius: "0.5rem",
  padding: "1.5rem",
  marginTop: "1.5rem",

  transition: "background-color $transitionDuration $transitionTiming",

  "@md": {
    cursor: "pointer",
  },
});

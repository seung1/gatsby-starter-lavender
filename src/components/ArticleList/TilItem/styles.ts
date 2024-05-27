import { styled } from "~/stitches.config";

export const TilCard = styled("li", {
  backgroundColor: "$gray100",
  borderRadius: "0 0.5rem 0.5rem 0",
  padding: "1.5rem",
  borderLeft: "0.25rem solid $primary200",
  marginTop: "2rem",
});

export const Article = styled("article", {
  display: "flex",
  flexDirection: "column",

  gap: "1rem",
});

export const New = styled("span", {
  fontSize: "1.1rem",
  marginLeft: "1rem",
  color: "$primary300",
  fontWeight: 700,
});

export const Header = styled("header", {});

export const Title = styled("h2", {
  transition: ".3s",
  lineHeight: 1.5,
  fontSize: "1.3rem",

  "@md": {
    fontSize: "1.5rem",
  },
});

export const Section = styled("section", {
  color: "$text200",

  transition: "color $transitionDuration $transitionTiming",
});

export const HashTagArea = styled("div", {
  display: "flex",
  gap: "0.5rem",
  flexWrap: "wrap",
  marginTop: "0.5rem",
});

export const HashTag = styled("h3", {
  padding: "0.25rem 0.5rem",
  borderRadius: "0.25rem",
  backgroundColor: "$gray200",
  color: "$text200",
  fontSize: "0.75rem",
});

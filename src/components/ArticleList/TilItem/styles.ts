import { styled } from "~/stitches.config";

export const TilCard = styled("li", {
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

export const Article = styled("article", {
  display: "flex",
  flexDirection: "column",

  gap: "0.25rem",

  "@md": {
    gap: "1rem",
  },
});

export const New = styled("span", {
  fontSize: "1.1rem",
  marginLeft: "1rem",
  color: "$primary300",
  fontWeight: 700,
});

export const Header = styled("header", {});

export const Title = styled("h2", {
  lineHeight: 1.5,
  fontSize: "1.3rem",

  "@md": {
    fontSize: "1.5rem",
  },
});

export const OpenSection = styled("section", {
  h4: {
    fontWeight: 300,
  },
});

export const CloseSection = styled("section", {
  display: "none",
  h4: {
    fontWeight: 300,
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  "@md": {
    display: "block",
  },
});

export const Description = styled("p", {
  color: "$text200",
  fontSize: "0.875rem",
  lineHeight: 1.5,
  fontWeight: 700,

  "@md": {
    display: "none",
  },
});

export const HashTagArea = styled("div", {
  display: "none",
  gap: "0.5rem",
  flexWrap: "wrap",
  marginTop: "0.5rem",

  "@md": {
    display: "flex",
  },
});

export const HashTag = styled("h3", {
  padding: "0.25rem 0.5rem",
  borderRadius: "0.25rem",
  backgroundColor: "$gray200",
  color: "$text200",
  fontSize: "0.75rem",

  transition:
    "background-color $transitionDuration $transitionTiming, color $transitionDuration $transitionTiming",
});

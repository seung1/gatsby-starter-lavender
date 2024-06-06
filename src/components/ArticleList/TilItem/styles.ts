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
  h4: {
    fontWeight: 300,
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
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

  transition:
    "background-color $transitionDuration $transitionTiming, color $transitionDuration $transitionTiming",
});

import { styled } from "~/stitches.config";

export const TilCard = styled("li", {
  backgroundColor: "$gray100",
  borderRadius: "0.5rem",
  padding: "1.5rem",

  boxShadow:
    "rgba(0, 0, 33, 0.07) 0px 16px 22.4px 4.8px,rgba(0, 0, 33, 0.05) 0px 3.2px 16px 0px,rgba(0, 0, 33, 0.07) 0px 0px 1px 0px",
});

export const Article = styled("article", {
  display: "flex",
  flexDirection: "column",
  marginBottom: "0.5rem",
  cursor: "default",

  gap: "0.5rem",
});

export const Content = styled("div", {});

export const Front = styled("span", {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "$text200",
  fontStyle: "italic",
});

export const TilDate = styled("span", {
  fontSize: "1.1rem",

  "@md": {
    margin: "0.5rem",
  },
});

export const New = styled("span", {
  fontSize: "1.1rem",

  ".new": {
    color: "$primary300",
    fontWeight: 700,

    "@md": {
      margin: "0.5rem",
    },
  },
});

export const Header = styled("header", {
  marginBottom: "0.5rem",

  "@md": {
    marginBottom: "1rem",
  },
});

export const Title = styled("h2", {
  transition: ".3s",
  lineHeight: 1.5,
  fontSize: "1.3rem",

  "@md": {
    fontSize: "1.5rem",
  },

  a: {
    color: "$text500",

    transition: "color $transitionDuration $transitionTiming",
  },
});

export const Section = styled("section", {
  color: "$text200",

  transition: "color $transitionDuration $transitionTiming",

  ">h4": {
    fontWeight: 600,
    lineHeight: 1.5,
  },
});

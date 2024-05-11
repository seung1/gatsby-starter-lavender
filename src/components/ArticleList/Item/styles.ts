import { styled } from "~/stitches.config";

export const ArticleCard = styled("li", {
  borderRadius: "1rem",
  transition: ".3s",
  position: "relative",

  "@md": {
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow:
        "rgba(0, 0, 33, 0.07) 0px 16px 22.4px 4.8px,rgba(0, 0, 33, 0.05) 0px 3.2px 16px 0px,rgba(0, 0, 33, 0.07) 0px 0px 1px 0px",
      h2: {
        color: "$primary300",
      },
    },
  },

  ":active.post-list-item": {
    transform: "scale(0.9)",
    "@md": {
      transform: "scale(0.95)",
    },
    transition: "transform .3s",
  },
});

export const Article = styled("article", {
  display: "flex",
  flexDirection: "column",
  padding: "1rem 0",
  marginBottom: "0.5rem",
  cursor: "default",

  "@md": {
    flexDirection: "row",
    cursor: "pointer",
    gap: "1.5rem",
    padding: "1.5rem",
    marginBottom: "1rem",
  },
});

export const Content = styled("div", {});

export const Front = styled("span", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.5rem",
  color: "$text200",
  fontStyle: "italic",

  "@md": {
    flexDirection: "column",
    margin: "0rem 0.5rem",
  },
});

export const Category = styled("span", {
  fontSize: "1.1rem",
  lineHeight: 1.5,
  fontWeight: 600,

  "@md": {
    fontSize: "1.3rem",
  },
});

export const ArticleDate = styled("span", {
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

export const Thumbnail = styled("img", {
  borderRadius: "0.5rem",
  objectFit: "cover",

  width: "6rem",
  height: "6rem",
  margin: "0 1.5rem 0 0",
});

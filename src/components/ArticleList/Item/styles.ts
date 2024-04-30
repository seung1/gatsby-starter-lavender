import { styled } from "~/stitches.config";

export const ArticleCard = styled("li", {
  borderRadius: "1rem",
  transition: ".3s",
  position: "relative",

  "@md": {
    "&:hover": {
      transform: "translateY(-0.5rem)",
      boxShadow:
        "rgba(0, 0, 33, 0.07) 0px 16px 22.4px 4.8px,rgba(0, 0, 33, 0.05) 0px 3.2px 16px 0px,rgba(0, 0, 33, 0.07) 0px 0px 1px 0px",
      h2: {
        color: "$primary300",
      },
    },
  },

  ":active.post-list-item": {
    transform: "scale(0.95)",
    borderRadius: 2,
    transition: "transform .3s",
  },
});

export const Article = styled("article", {
  display: "flex",
  gap: "2rem",
  padding: "1rem",
  marginBottom: "0.5rem",

  "@md": {
    gap: "1.5rem",
    padding: "1.5rem",
    marginBottom: "1rem",
  },
});

export const Content = styled("div", {});

export const Front = styled("span", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  maxWidth: "3rem",
  minWidth: "3rem",
  color: "$text200",
  fontStyle: "italic",

  "@md": {
    margin: "0rem 0.5rem",
  },
});

export const Category = styled("span", {
  fontSize: "1.3rem",
  lineHeight: 1.5,
  fontWeight: 600,
});

export const Date = styled("span", {
  fontSize: "1.1rem",
});

export const Header = styled("header", {
  margin: "0rem auto 1rem",
});

export const Title = styled("h2", {
  fontSize: "1.5rem",
  transition: ".3s",

  a: {
    color: "$text500",

    transition: "color $transitionDuration $transitionTiming",
  },
});

export const Section = styled("section", {
  color: "$text200",

  transition: "color $transitionDuration $transitionTiming",

  ">h4": {
    margin: "0.5rem auto",
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

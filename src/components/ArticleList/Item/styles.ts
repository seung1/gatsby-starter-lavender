import { styled } from "~/stitches.config";

export const Article = styled("article", {
  display: "flex",
  padding: "1rem 0.5rem",
  marginBottom: "0.5rem",

  "@md": {
    padding: "1.5rem 1rem",
    marginBottom: "1rem",
  },

  ":hover": {
    h2: {
      color: "$primary300",
    },
  },
});

export const Content = styled("div", {});

export const Header = styled("header", {
  margin: "0rem auto 1rem",
});

export const Title = styled("h2", {
  fontSize: "1.5rem",

  a: {
    color: "$text500",

    transition: "color $transitionDuration $transitionTiming",
  },
});

export const Section = styled("section", {
  color: "$text200",

  transition: "color $transitionDuration $transitionTiming",
});

export const Thumbnail = styled("img", {
  borderRadius: "0.5rem",

  width: "6rem",
  height: "6rem",
  margin: "0 1.5rem 0 0",
});

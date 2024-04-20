import { styled } from "~/stitches.config";

export const Article = styled("article", {
  display: "flex",
  marginBottom: "1rem",
});

export const Content = styled("div", {
  marginLeft: "2rem",
});

export const Header = styled("header", {
  margin: "1rem auto",
});

export const Title = styled("h2", {
  fontSize: "1.5rem",

  a: {
    color: "$text500",

    transition: "color $transitionDuration $transitionTiming",
  },
});

export const Section = styled("section", {
  marginBottom: "3rem",

  color: "$text200",

  transition: "color $transitionDuration $transitionTiming",
});

export const Thumbnail = styled("img", {
  borderRadius: "0.5rem",

  width: "6rem",
  height: "6rem",
  margin: 0,
});

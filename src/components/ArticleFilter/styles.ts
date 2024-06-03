import { styled } from "~/stitches.config";

export const Container = styled("section", {
  margin: "-0.5rem 0 0.5rem",

  "@md": {
    margin: "-0.5rem 0 1rem",
  },
});

export const TagListWrapper = styled("div", {
  display: "flex",
  borderRadius: "0.5rem",
  overflow: "hidden",
  width: "100%",
});

export const Tag = styled("button", {
  height: "2.5rem",
  padding: "auto 0.5rem",

  border: 0,

  color: "$text300",
  fontSize: "0.9rem",
  fontWeight: 800,

  backgroundColor: "$gray100",
  cursor: "pointer",

  transition:
    "background-color $transitionDuration $transitionTiming, color $transitionDuration $transitionTiming",

  appearance: "none",
  flexGrow: 1,

  variants: {
    filtered: {
      true: {
        color: "$primary400",

        backgroundColor: "$primary200",
      },
    },
  },

  "@md": {
    fontSize: "1rem",
    height: "2.75rem",
  },
});

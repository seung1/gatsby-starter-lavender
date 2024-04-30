import { styled } from "~/stitches.config";

export const Container = styled("section", {
  display: "flex",
  gap: "1rem",
  margin: "2rem auto",
  padding: "0.5rem 1rem",

  // borderLeft: "0.25rem solid $borderPrimary",

  transition: "border-left-color $transitionDuration $transitionTiming",
});

export const Title = styled("h3", {
  display: "block",
  lineHeight: "2.5rem",
  color: "$primary300",
  width: "4rem",
  textAlign: "center",

  transition: "color $transitionDuration $transitionTiming",

  "@md": {
    width: "5.5rem",
  },
});

export const InputWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  flex: 1,
});

export const Input = styled("input", {
  maxWidth: "20rem",
  width: "100%",
  height: "2.5rem",
  padding: "0.5rem 0.75rem",
  border: "1px solid $borderGray",
  borderRadius: "0.25rem",

  color: "$text500",
  fontSize: "1rem",

  backgroundColor: "$titleFilterBackground",

  transition:
    "color $transitionDuration $transitionTiming, border-color $transitionDuration $transitionTiming, background-color $transitionDuration $transitionTiming",

  appearance: "none",
});

export const TagListWrapper = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
});

export const Tag = styled("button", {
  padding: "0.5rem 1rem",
  border: 0,
  borderRadius: "0.25rem",

  color: "$tagColor",
  fontSize: "0.875rem",

  backgroundColor: "$tagFilterBackground",
  cursor: "pointer",

  transition:
    "color $transitionDuration $transitionTiming, background-color $transitionDuration $transitionTiming",

  appearance: "none",

  variants: {
    filtered: {
      true: {
        color: "$primary500",

        backgroundColor: "$primary200",
      },
    },
  },
});

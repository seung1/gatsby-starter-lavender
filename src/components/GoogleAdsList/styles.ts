import { styled } from "~/stitches.config";

export const Container = styled("li", {
  border: "1px solid #e1e4e8",
  borderRadius: "1rem",
  overflow: "hidden",
  transition: ".3s",
  display: "flex",
  alignItems: "center",

  "@md": {
    "&:hover": {
      transform: "translateY(-0.5rem)",
      boxShadow:
        "rgba(0, 0, 33, 0.07) 0px 16px 22.4px 4.8px,rgba(0, 0, 33, 0.05) 0px 3.2px 16px 0px,rgba(0, 0, 33, 0.07) 0px 0px 1px 0px",
    },
  },
});

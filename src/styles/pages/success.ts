import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginInline: "auto",
  height: 656,

  h1: {
    marginTop: "3rem",
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    lineHeight: 1.4,
    maxWidth: 560,
    textAlign: "center",
    marginTop: "1.5rem",
  },

  a: {
    display: "block",
    marginTop: "4rem",
    fontSize: "$lg",
    color: "$green500",
    textDecoration: "none",
    fontWeight: "700",

    transition: "color 200ms linear",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const ImagesContainer = styled("div", {
  display: "flex",
  alignItems: "center",
});

export const ImageContainer = styled("div", {
  aspectRatio: "1 / 1",
  width: 140,
  background: "var(--image-gradient)",
  borderRadius: "50%",
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  boxShadow: "0 0 60px rgb(0 0 0 / 0.8)",

  img: {
    objectFit: "cover",
  },

  "&:not(:first-child)": {
    marginLeft: "-3.25rem",
  },
});

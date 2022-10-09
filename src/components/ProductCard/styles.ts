import { styled } from "../../styles";

export const ProductCardContainer = styled("div", {
  minWidth: 540,

  "&:hover": {
    footer: {
      transform: "translateY(0)",
      opacity: 1,
    },
  },
});

export const ImageContainer = styled("div", {
  background: "var(--image-gradient)",
  borderRadius: 8,
  position: "relative",
  overflow: "hidden",
  height: "100%",
  width: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const Footer = styled("footer", {
  position: "absolute",
  inset: "auto 0.25rem 0.25rem",
  padding: "2rem",
  borderRadius: 6,

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  backgroundColor: "rgb(0 0 0 / 0.6)",

  transform: "translateY(110%)",
  opacity: 0,
  transition: "all 0.2s ease-in-out",
});

export const ProductInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const Name = styled("strong", {
  display: "block",
  fontSize: "$lg",
  color: "$gray100",
});

export const Price = styled("span", {
  fontSize: "$xl",
  fontWeight: "700",
  color: "$green300",
});

export const AddToCartButton = styled("button", {
  borderRadius: 6,
  aspectRatio: "1 / 1",
  width: "3.5rem",
  backgroundColor: "$green500",
  color: "$white",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  transition: "background-color 200ms linear",

  "&:hover": {
    backgroundColor: "$green300",
  },
});

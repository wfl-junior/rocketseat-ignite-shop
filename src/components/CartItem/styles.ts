import { styled } from "../../styles";

export const CartItemContainer = styled("div", {
  display: "flex",
  alignItems: "stretch",
  gap: "1.25rem",
});

export const ImageContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--image-gradient)",
  width: "6.375rem",
  height: "5.8125rem",
  borderRadius: 8,

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export const Info = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.375rem",
});

export const Name = styled("strong", {
  display: "block",
  fontSize: "1.125rem",
  color: "$gray300",
  fontWeight: "400",
});

export const Price = styled("strong", {
  display: "block",
  fontSize: "1.125rem",
  color: "$gray100",
  fontWeight: "700",
});

export const RemoveFromCartButton = styled("button", {
  width: "max-content",
  marginTop: "auto",
  fontWeight: "bold",
  fontSize: "1rem",
  color: "$green500",
  background: "transparent",

  transition: "color 200ms linear",

  "&:hover": {
    color: "$green300",
  },
});

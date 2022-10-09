import { styled } from "../../styles";

export const HeaderContainer = styled("header", {
  paddingBlock: "2rem",
  width: "100%",
  maxWidth: 1180,
  marginInline: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const CartButton = styled("button", {
  color: "$gray400",
  aspectRatio: "1 / 1",
  width: "3rem",
  backgroundColor: "$gray800",
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "filter 200ms linear",

  "&[data-cart-items]": {
    color: "$gray300",
    position: "relative",

    "&::after": {
      boxSizing: "initial",
      content: "attr(data-cart-items)",
      position: "absolute",
      top: "-0.625rem",
      right: "-0.75rem",
      aspectRatio: "1 / 1",
      width: "1.5rem",
      borderRadius: "50%",
      backgroundColor: "$green500",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.875rem",
      color: "$white",
      fontWeight: "700",
      border: "3px solid $gray900",
    },
  },

  "&:hover": {
    filter: "brightness(0.9)",
  },
});

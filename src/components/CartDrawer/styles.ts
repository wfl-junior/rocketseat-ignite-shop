import { styled } from "../../styles";

export const CartDrawerContainer = styled("aside", {
  backgroundColor: "$gray800",
  width: "min(100%, 480px)",
  position: "fixed",
  zIndex: 9,
  top: 0,
  bottom: 0,
  right: 0,
  padding: "3rem",
  display: "flex",
  flexDirection: "column",

  transition: "300ms linear",
  transitionProperty: "translate, box-shadow",

  variants: {
    variant: {
      open: {
        translate: "0",
        boxShadow: "-4px 0 30px rgb(0 0 0 / 0.8)",
      },
      closed: {
        translate: "100%",
      },
    },
  },

  defaultVariants: {
    variant: "closed",
  },
});

export const CloseButton = styled("button", {
  position: "absolute",
  color: "$gray400",
  aspectRatio: "1 / 1",
  width: "1.5rem",
  lineHeight: 0,
  background: "transparent",
  top: "1.5rem",
  right: "1.5rem",

  transition: "filter 200ms linear",

  svg: {
    width: "100%",
    height: "100%",
  },

  "&:hover": {
    filter: "brightness(0.8)",
  },
});

export const Title = styled("strong", {
  color: "$gray100",
  fontSize: "1.5rem",
  fontWeight: "700",
  marginTop: "1.5rem",
  display: "block",
});

export const Items = styled("div", {
  flex: 1,
  marginBlock: "2rem",
  overflowY: "auto",

  // "&::webkit-scrollbar": {
  //   width: "1rem",
  // },

  // "&::webkit-scrollbar-track": {
  //   backgroundColor: "$green500",
  //   borderRadius: "100vmax",
  // },

  // "&::webkit-scrollbar-thumb": {
  //   backgroundColor: "$green300",
  //   borderRadius: "100vmax",
  // },
});

export const Summary = styled("div", {
  marginBottom: "3.5625rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.375rem",
});

export const QuantityContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
  color: "$gray100",
  fontSize: "1rem",
  fontWeight: "400",
});

export const Quantity = styled("span", {
  fontSize: "1.125rem",
});

export const TotalContainer = styled(QuantityContainer, {
  fontSize: "1.125rem",
  fontWeight: "700",
});

export const Price = styled("span", {
  fontSize: "1.5rem",
});

export const PurchaseButton = styled("button", {
  width: "100%",
  borderRadius: 8,
  backgroundColor: "$green500",
  fontWeight: "700",
  fontSize: "1.125rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$white",
  padding: "1.25rem 2rem",

  transition: "background-color 200ms linear",

  "&:hover": {
    backgroundColor: "$green300",
  },
});

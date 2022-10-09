import { globalCss } from ".";

export const globalStyles = globalCss({
  ":root": {
    "--image-gradient": "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  },

  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },

  body: {
    color: "$gray100",
    backgroundColor: "$gray900",
    "-webkit-font-smoothing": "antialised",
  },

  "body, input, textarea, button, select": {
    font: "400 1rem Roboto, sans-serif",
  },

  "a, button": {
    cursor: "pointer",
  },

  button: {
    border: 0,
  },
});

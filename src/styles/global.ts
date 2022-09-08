import { globalCss } from ".";

export const globalStyles = globalCss({
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  body: {
    "-webkit-font-smoothing": "antialised",
    backgroundColor: "$gray900",
    color: "$gray100",
  },
  "body, input, textarea, button, select": {
    font: "400 1rem Roboto, sans-serif",
  },
  "a, button": {
    cursor: "pointer",
  },
});

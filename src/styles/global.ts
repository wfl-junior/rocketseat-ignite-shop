import { globalCss } from ".";

export const globalStyles = globalCss({
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
});

import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
  },

  body: {
    backgroundColor: "$gray900",
    "-webkit-font-smoothing": "antialiased",
    color: "$white",
  },

  "body, input, textArea, button": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },
});

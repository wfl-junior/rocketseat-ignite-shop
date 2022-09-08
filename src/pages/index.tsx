import type { NextPage } from "next";
import { styled } from "../styles";

const Button = styled("button", {
  backgroundColor: "$rocketseat",
  borderRadius: 4,
  border: 0,
  padding: "0.25rem 0.5rem",
  cursor: "pointer",

  span: {
    fontWeight: "bold",
  },

  "&:hover": {
    filter: "brightness(0.8)",
  },
});

const Home: NextPage = () => (
  <Button>
    <span>Teste</span>
    &nbsp;Enviar
  </Button>
);

export default Home;

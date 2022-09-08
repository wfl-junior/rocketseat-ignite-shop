import type { AppProps } from "next/app";
import Image from "next/future/image";
import Head from "next/head";
import { Fragment } from "react";
import logo from "../assets/logo.svg";
import { globalStyles } from "../styles/global";
import { Container, Header } from "../styles/pages/app";

globalStyles();

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Fragment>
    <Head>
      <title>Ignite Shop</title>
    </Head>

    <Container>
      <Header>
        <Image src={logo} alt="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  </Fragment>
);

export default App;

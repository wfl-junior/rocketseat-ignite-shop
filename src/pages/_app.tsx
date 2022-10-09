import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { Fragment } from "react";
import { CartDrawer } from "../components/CartDrawer";
import { Header } from "../components/Header";
import { CartDrawerContextProvider } from "../contexts/CartDrawerContext";
import { globalStyles } from "../styles/global";
import { Container } from "../styles/pages/app";

globalStyles();

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Fragment>
    <Head>
      <title>Ignite Shop</title>
    </Head>

    <NextNProgress
      color="var(--colors-green500)"
      height={2}
      options={{ showSpinner: false }}
      stopDelayMs={50}
    />

    <Container>
      <CartDrawerContextProvider>
        <Header />
        <CartDrawer />
      </CartDrawerContextProvider>

      <Component {...pageProps} />
    </Container>
  </Fragment>
);

export default App;

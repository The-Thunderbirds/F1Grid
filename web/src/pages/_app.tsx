import { AppProps as NextAppProps } from "next/app"
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";

import { SessionProvider } from "next-auth/react"
import { ComponentWithAuth } from "../components/ComponentWithAuth"
import { AuthProvider } from "../components/AuthProvider"
import { GraphQLClientProvider } from "../components/GraphQLClientProvider"

type AppProps<P = {}> = NextAppProps<P> & {
  Component: ComponentWithAuth
}

export default function ({ Component, pageProps: { session, auth, ...pageProps } }: AppProps): JSX.Element {
  return (
  <div>
      <SessionProvider session={session} refetchInterval={60 * 60}>
        <AuthProvider requireAuth={Component.requireAuth}>
          <GraphQLClientProvider>
            <Header/>
            <Component {...pageProps} />
            <Footer/>
          </GraphQLClientProvider>
        </AuthProvider>
      </SessionProvider>
  </div>
  )
}

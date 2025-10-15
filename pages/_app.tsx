import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { NotifProvider } from "./components/element/laerts";
import { LinkProvider } from "./LinkContext";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-display",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.variable}>
      {/* <NavbarDemo> */}
      <NotifProvider >
        <LinkProvider>
          <Component {...pageProps} />
        </LinkProvider>

      </NotifProvider>
      {/* </NavbarDemo> */}
    </main>
  )
}

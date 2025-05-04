import type { AppProps } from "next/app";
import { AuthProvider } from "@/src/contexts/AuthContext";
import "@/src/styles/globals.css";
import Layout from "@/src/components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

// pages/_app.tsx
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { FirebaseServiceProvider } from '../contexts/FirebaseServiceContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseServiceProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FirebaseServiceProvider>
  )
}

export default MyApp

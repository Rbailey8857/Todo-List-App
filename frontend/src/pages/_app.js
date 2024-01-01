import '../styles/globals.css'
import { configureChains, mainnet, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
 [mainnet],
 [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})


export default function App({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </>
    
  )
}

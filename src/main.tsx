import { WalletProvider } from '@context/wallet'
import { Web3ReactProvider } from '@web3-react/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Web3 from 'web3'
import App from './App'

import 'antd/dist/antd.less'

function getLibrary(provider: any) {
  return new Web3(provider)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletProvider>
        <App />
      </WalletProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
)

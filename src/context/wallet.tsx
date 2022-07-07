declare var window: any

import { WalletInfo, WalletType } from '@types/ether'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import React, { useContext, useEffect, useState } from 'react'

interface WalletContextType {
  unlockWallet: (providerName: WalletType, onError?: () => void, onComplete?: () => void) => void
  lockWallet: () => void
  activeWallet: boolean
  walletInfo: WalletInfo
  chainId: string | undefined
  library: any
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 137, 80001] })

const handleDisconnect = () => {
  console.log("handling 'disconnect' event")
}

const handleAccountsChanged = (accounts: string[]) => {
  console.log("handling 'accountsChanged' event with payload %O", accounts)
}

const handleMessage = (message: string) => {
  console.log("handling 'handleMessage' event with payload %O", message)
}

const WalletContext = React.createContext<WalletContextType>(null!)

export function WalletProvider(props: React.PropsWithChildren<{}>) {
  const { activate, active, account, library, chainId, error } = useWeb3React()
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    if (!account || !library) {
      return
    }

    const getbalance = async () => {
      // Returns BigNumber - i.e., 1ETH = 1000000000000000000 (Wei)
      const balance = await library.eth.getBalance(account)
      // Converts Wei to Ether
      const balanceInEther = await library.utils.fromWei(balance)
      setBalance(balanceInEther)
    }

    getbalance()
  }, [account, library])

  const walletInfo = {
    address: account || '',
    chainId: chainId || '',
    balance: balance || 0,
  } as WalletInfo

  /**
   * Inject provider before activating injected in order to open up a specific browser wallet extension. Without this function, all available wallets on the user's browser will open up.
   * @param providerName
   * @returns
   */
  const activateInjectedProvider = (providerName: WalletType) => {
    const { ethereum } = window

    if (!ethereum?.providers) {
      return undefined
    }

    let provider
    switch (providerName) {
      case 'coinbase':
        provider = ethereum.providers.find(
          ({ isCoinbaseWallet }: { isCoinbaseWallet: boolean }) => isCoinbaseWallet,
        )
        break
      case 'metamask':
        provider = ethereum.providers.find(({ isMetaMask }: { isMetaMask: boolean }) => isMetaMask)
        break
    }

    if (provider) {
      ethereum.setSelectedProvider(provider)
    }
  }

  const unlockWallet: WalletContextType['unlockWallet'] = (providerName, onError, onComplete) => {
    console.log('unlocking wallet')
    activateInjectedProvider(providerName)
    activate(
      injected,
      error => {
        console.log('error unlocking wallet %O', error)
        onError && onError()
      },
      false,
    ).then(() => {
      onComplete?.()
    })
  }

  const lockWallet: WalletContextType['lockWallet'] = () => {
    console.log('locking wallet')
  }

  const handleConnect = () => {
    console.log("handling 'connect' event")
  }

  const handleChainChanged = (chainId: string) => {
    console.log("handling 'chainChanged' event with payload %O", chainId)
  }

  const handleNetworkChanged = (networkId: number) => {
    console.log("handling 'networkChanged' event with payload %O", networkId)
  }

  useEffect((): any => {
    const { ethereum } = window as any
    if (ethereum && ethereum.on && !active && !error) {
      ethereum.on('connect', handleConnect)
      ethereum.on('disconnect', handleDisconnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)
      ethereum.on('message', handleMessage)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
          ethereum.removeListener('message', handleMessage)
        }
      }
    }
  }, [active, error, activate])

  return (
    <WalletContext.Provider
      value={{
        unlockWallet: unlockWallet,
        lockWallet: lockWallet,
        activeWallet: active && !!walletInfo.address && !!walletInfo.chainId,
        walletInfo: walletInfo,
        chainId: chainId?.toFixed(),
        library,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  )
}

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('usWallet must be used within the <WalletProuc>..</WalletProuc>')
  }
  return context
}

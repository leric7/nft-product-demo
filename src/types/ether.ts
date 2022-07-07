export interface WalletInfo {
  address: string
  chainId: string | number
  balance: number
}

export type Address = string

export type WalletType = 'metamask' | 'coinbase' | ''

export function getErrorMessageForFailedWalletConnection(providerName: WalletType) {
  return `No Ethereum browser extension detected, please install ${
    providerName === 'metamask' ? 'Metamask' : 'Coinbase'
  }.`
}

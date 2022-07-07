import { ConnectWalletModal } from '@components/connect-wallet-modal'
import { ProductClaimed } from '@components/product-claimed'
import { ProductReceived } from '@components/product-received'
import { useWallet } from '@context/wallet'
import { mafiaNFTs } from '@data/mafia-nfts'
import { MainLayout } from '@layout/MainLayout'
import { FC, useEffect, useState } from 'react'

const App: FC = () => {
  const [claimdId, setClaimdId] = useState<number>()
  const [showConnectDialog, setShowConnectDialog] = useState<boolean>(false)
  const { activeWallet } = useWallet()

  useEffect(() => {
    if (activeWallet) {
      setClaimdId(Math.floor(Math.random() * 100) % mafiaNFTs.length)
    } else {
      setClaimdId(undefined)
    }
  }, [activeWallet])

  return (
    <MainLayout>
      {claimdId === undefined ? (
        <>
          <ProductReceived onClickConnect={() => setShowConnectDialog(true)} />
          <ConnectWalletModal
            visible={showConnectDialog}
            onOk={() => setShowConnectDialog(false)}
            onCancel={() => setShowConnectDialog(false)}
          />
        </>
      ) : (
        <ProductClaimed product={mafiaNFTs[claimdId]} />
      )}
    </MainLayout>
  )
}

export default App

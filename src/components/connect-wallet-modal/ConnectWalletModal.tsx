import { ReactComponent as CoinbaseIcon } from '@assets/brand/coinbase.svg'
import { ReactComponent as MetaMaskIcon } from '@assets/brand/metamask.svg'
import { ReactComponent as RareCirclesIcon } from '@assets/brand/rare-circles.svg'
import { useWallet } from '@context/wallet'
import { getErrorMessageForFailedWalletConnection, WalletType } from '@types/ether'
import { Button, Modal, ModalProps, Popover, Typography } from 'antd'
import { FC, useState } from 'react'
import styled from 'styled-components'

export const ConnectWalletModal: FC<ModalProps> = props => {
  const { unlockWallet } = useWallet()
  const [targetWallet, setTargetWallet] = useState<WalletType>()

  const onWalletSelect = (walletType: WalletType): void => {
    setTargetWallet(walletType)

    unlockWallet(walletType, () => {
      getErrorMessageForFailedWalletConnection(walletType)
      setTargetWallet('')
    })
  }

  return (
    <Modal {...props}>
      <Wrapper>
        <TextWrapper>
          <Typography.Title level={3} style={{ fontWeight: 700, marginBottom: 0 }}>
            Connect your wallet to claim
          </Typography.Title>
          <Typography.Paragraph
            style={{
              fontSize: 14,
              lineHeight: '24px',
              fontFamily: '"Inter", sans-serif',
              marginBottom: 0,
            }}
          >
            Use an existing ETH wallet to mint an NFT.
          </Typography.Paragraph>
        </TextWrapper>
        <ButtonWrapper>
          <Popover content="Connect Metamask Wallet" trigger="hover">
            <WalletButton onClick={() => onWalletSelect('metamask')}>
              <MetaMaskIcon />
              MetaMask
            </WalletButton>
          </Popover>
          <Popover content="Connect Coinbase Wallet" trigger="hover">
            <WalletButton onClick={() => onWalletSelect('coinbase')}>
              <CoinbaseIcon />
              Coinbase Wallet
            </WalletButton>
          </Popover>
        </ButtonWrapper>
        <a href="https://metamask.zendesk.com/hc/en-us" target="_blank" rel="noreferrer">
          <Typography.Text underline>Learn more about wallets</Typography.Text>
        </a>
        <FooterWrapper>
          <Typography.Text strong style={{ fontSize: 12 }}>
            Powered by
          </Typography.Text>
          <a href="https://www.rarecircles.com" target="_blank" rel="noreferrer">
            <RareCirclesIcon />
          </a>
        </FooterWrapper>
      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  width: 100%;
`

const WalletButton = styled(Button)`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 44px;
  height: inherit;

  svg {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 10px;
    left: 12px;
  }
`

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

ConnectWalletModal.defaultProps = {
  footer: null,
  closable: false,
  centered: true,
  bodyStyle: {
    padding: 40,
    boxShadow: `0px 15px 50px rgba(0, 0, 0, 0.1)`,
    borderRadius: 8,
  },
}

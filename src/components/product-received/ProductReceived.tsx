import placeholderImage from '@assets/media/placeholder.svg'
import { Button, Image, Popover, Typography } from 'antd'
import { FC } from 'react'
import styled from 'styled-components'

export type ProductReceivedProps = {
  onClickConnect?: () => void
}

export const ProductReceived: FC<ProductReceivedProps> = ({ onClickConnect }) => {
  return (
    <Wrapper>
      <Image
        src={placeholderImage}
        width={180}
        height={180}
        style={{
          filter: `drop-shadow(0px 15px 50px rgba(0, 0, 0, 0.1))`,
          borderRadius: 16,
          padding: 20,
          background: `rgba(0, 0, 0, 0.02)`,
        }}
      />
      <TextWrapper>
        <Typography.Title
          style={{ fontSize: 46, lineHeight: '54px', fontWeight: 700, marginBottom: 0 }}
        >
          You received a mystery NFT 👀
        </Typography.Title>
        <Typography.Paragraph style={{ fontSize: 16, lineHeight: '24px', marginBottom: 0 }}>
          Connect an Ethereum wallet to claim your NFT.
        </Typography.Paragraph>
      </TextWrapper>
      <Popover content="Connect wallet to claim the NFT" trigger="hover">
        <Button
          style={{
            background: '#010101',
            borderRadius: 4,
            color: '#FFFFFF',
            padding: '10px 16px',
            height: 'inherit',
            fontSize: 16,
            lineHeight: '24px',
            fontWeight: 600,
          }}
          onClick={onClickConnect}
        >
          Connect wallet
        </Button>
      </Popover>
    </Wrapper>
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

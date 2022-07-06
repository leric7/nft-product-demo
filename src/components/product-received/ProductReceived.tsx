import placeholderImage from '@assets/media/placeholder.svg'
import { Col, Image, Row, Typography } from 'antd'
import { FC } from 'react'
import styled from 'styled-components'

export const ProductReceived: FC = () => {
  return (
    <Wrapper>
      <PlaceholderWrapper>
        <Image src={placeholderImage} width={140} height={140} />
      </PlaceholderWrapper>
      <Typography.Title>You received a mystery NFT �</Typography.Title>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

const PlaceholderWrapper = styled.div`
  filter: drop-shadow(0px 15px 50px rgba(0, 0, 0, 0.1));
  border-radius: 16px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.02);
`

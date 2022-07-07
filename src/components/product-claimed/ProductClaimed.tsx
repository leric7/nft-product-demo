import { ReactComponent as TwitterIcon } from '@assets/brand/twitter.svg'
import { MafiaNFT } from '@data/mafia-nfts'
import { Button, Image, Popover, Typography } from 'antd'
import confetti from 'canvas-confetti'
import { FC, useEffect, useRef } from 'react'
import { TwitterShareButton } from 'react-share'
import styled from 'styled-components'

export type ProductClaimedProps = {
  product: MafiaNFT
}

const randomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export const ProductClaimed: FC<ProductClaimedProps> = ({ product }) => {
  // eslint-disable-next-line no-undef
  const confettiInterval = useRef<NodeJS.Timeout>()

  useEffect(() => {
    startConfetti()

    return () => {
      if (confettiInterval.current) {
        clearInterval(confettiInterval.current)
      }
    }
  }, [])

  const startConfetti = () => {
    const duration = 5 * 1000 // 5 seconds
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    confettiInterval.current = setInterval(function () {
      var timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(confettiInterval.current)
      }

      var particleCount = 50 * (timeLeft / duration)
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        }),
      )
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        }),
      )
    }, 250)
  }

  return (
    <Wrapper>
      <Popover content={product.description} trigger="hover">
        <Image
          src={product.imageURL}
          width={180}
          height={180}
          style={{
            filter: `drop-shadow(0px 15px 50px rgba(0, 0, 0, 0.1))`,
            borderRadius: 16,
            padding: 20,
            background: `rgba(225, 215, 213, 0.5)`,
          }}
        />
      </Popover>
      <TextWrapper>
        <Typography.Title style={{ fontSize: 46, lineHeight: '54px', marginBottom: 0 }}>
          You claimed Mafia #{product.id} 🎉
        </Typography.Title>
        <Typography.Paragraph style={{ fontSize: 16, lineHeight: '24px', marginBottom: 0 }}>
          You can track the transaction&nbsp;
          <a href="https://etherscan.io" target="_blank" rel="noreferrer">
            <Typography.Text>
              <u>Etherscan</u>
            </Typography.Text>
          </a>
        </Typography.Paragraph>
      </TextWrapper>
      <Popover content="Click to share on twitter" trigger="hover">
        <TwitterShareButton url={product.imageURL} title={product.description}>
          <Button
            style={{
              background: '#1DA1F2',
              borderRadius: 4,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TwitterIcon />
            &nbsp;Share on Twitter
          </Button>
        </TwitterShareButton>
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

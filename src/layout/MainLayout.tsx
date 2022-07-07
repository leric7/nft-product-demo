import eightBitMafiaImage from '@assets/brand/8-bit-mafia.svg'
import bannerImage from '@assets/media/banner.svg'
import { Avatar, Layout, Typography } from 'antd'
import { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'

const { Header, Footer, Content } = Layout
const { Text } = Typography

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout style={{ background: 'transparent' }}>
      <Header
        style={{
          backgroundColor: '#f7f7f7',
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat-x',
          display: 'flex',
          alignItems: 'flex-start',
          padding: 24,
          height: 200,
        }}
      >
        <a href="https://www.eightbitmafia.com/" target="_blank" rel="noreferrer">
          <LogoWrapper>
            <Avatar
              src={<img src={eightBitMafiaImage} style={{ objectFit: 'contain' }} />}
              style={{ backgroundColor: '#28ED29', padding: 8 }}
              size={40}
            />
            <Text strong style={{ lineHeight: '22px' }}>
              8-bit mafia
            </Text>
          </LogoWrapper>
        </a>
      </Header>
      <Content>
        <ContentWrapper>{children}</ContentWrapper>
      </Content>
      <Footer
        style={{
          background: 'transparent',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '6px 16px',
          height: 32,
        }}
      >
        <div>
          <FooterText type="secondary">Powered by </FooterText>
          <a href="https://www.rarecircles.com/" target="_blank" rel="noreferrer">
            <FooterText>RareCircles. All Rights Reserved.</FooterText>
          </a>
        </div>
        <div>
          <FooterText type="secondary">
            Use of the service and website is subject to our&nbsp;
          </FooterText>
          <a
            href="https://store.rarecircles.com/terms-of-services"
            target="_blank"
            rel="noreferrer"
          >
            <FooterText>Terms of Use</FooterText>
          </a>
          <FooterText type="secondary"> and </FooterText>
          <a href="https://store.rarecircles.com/privacy-policy" target="_blank" rel="noreferrer">
            <FooterText>Privacy Statement</FooterText>
          </a>
          <FooterText>.</FooterText>
        </div>
      </Footer>
    </Layout>
  )
}

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 16px 4px 4px;
  gap: 8px;
  background: #ffffff;
  border-radius: 100px;
`

const ContentWrapper = styled.div`
  min-height: calc(100vh - 232px);
  display: flex;
  align-items: center;
  justify-content: center;
`

const FooterText = styled(Text)`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 20px;
  font-weight: 500;
`

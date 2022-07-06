import { ProductReceived } from '@components/product-received'
import { MainLayout } from '@layout/MainLayout'
import { FC } from 'react'

const App: FC = () => {
  return (
    <MainLayout>
      <ProductReceived />
    </MainLayout>
  )
}

export default App

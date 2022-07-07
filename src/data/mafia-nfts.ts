import mafia1Image from '@assets/media/8-bit/1.svg'
import mafia2Image from '@assets/media/8-bit/2.svg'
import mafia3Image from '@assets/media/8-bit/3.svg'
import mafia4Image from '@assets/media/8-bit/4.svg'
import mafia5Image from '@assets/media/8-bit/5.svg'
import mafia6Image from '@assets/media/8-bit/6.svg'

export type MafiaNFT = {
  id: number
  imageURL: string
  description: string
}

export const mafiaNFTs: Array<MafiaNFT> = [
  {
    id: 802,
    imageURL: mafia1Image,
    description: 'Moon Mafia',
  },
  {
    id: 809,
    imageURL: mafia2Image,
    description: 'Earth Mafia',
  },
  {
    id: 1083,
    imageURL: mafia3Image,
    description: 'Cyber Mafia',
  },
  {
    id: 1348,
    imageURL: mafia4Image,
    description: 'Pool Mafia',
  },
  {
    id: 3572,
    imageURL: mafia5Image,
    description: 'Crown Mafia',
  },
  {
    id: 3689,
    imageURL: mafia6Image,
    description: 'Fire Mafia',
  },
]

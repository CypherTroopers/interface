import { Chain, Image } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import { faker } from 'uniswap/src/test/shared'
import { createFixture } from 'uniswap/src/test/utils'

export const GQL_CHAINS = [Chain.Cypherium]

export const image = createFixture<Image>()(() => ({
  __typename: 'Image',
  id: faker.datatype.uuid(),
  url: faker.image.imageUrl(),
}))

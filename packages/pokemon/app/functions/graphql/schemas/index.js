
import { stitchSchemas } from '@graphql-tools/stitch'
import { contentfulSchema } from './contentful'

import * as PokeApi from './pokeApi'

export const contexters = [
  PokeApi.contexter
]

export const getSchema = async () => stitchSchemas({
  subschemas: [
    await contentfulSchema
  ],
  ...PokeApi.schema
})

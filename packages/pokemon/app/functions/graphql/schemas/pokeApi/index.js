
import { mergeDeepRight, reduce } from 'ramda'

import { pokemonByName } from './dataloader'

import * as Pokemon from './Pokemon/pokemon.schema'
// Root Types
import * as Query from './Query/query.schema'

export const schema = reduce(
  (acc, { typeDefs, resolvers }) => ({
    typeDefs: [...acc.typeDefs, typeDefs],
    resolvers: mergeDeepRight(acc.resolvers, resolvers)
  }),
  { typeDefs: [], resolvers: {} },
  [
    Pokemon,
    Query
  ]
)

export const contexter = context => mergeDeepRight(context, {
  dataloaders: {
    pokemonByName: pokemonByName()
  }
})

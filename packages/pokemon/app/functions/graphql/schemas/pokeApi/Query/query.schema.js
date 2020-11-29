
import { gql } from 'apollo-server-micro'

import { fetchPokemons } from '../client'

export const typeDefs = gql`
  type Query {
    pokemonCollection (offset: Int, limit: Int): [Pokemon!]!,
    pokemon (name: String!): Pokemon
  }
`

export const resolvers = {
  Query: {
    pokemonCollection: async (_, { offset = 0, limit = 0 }) => {
      const data = await fetchPokemons({ offset, limit })
      return data.results // [{ name, url }]
    },
    pokemon: (_, { name }, { dataloaders }) => dataloaders.pokemonByName.load(name) // primes dataloader for subsequent resolvers
  }
}

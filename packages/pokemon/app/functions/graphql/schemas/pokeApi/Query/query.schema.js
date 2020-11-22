
import { gql } from 'apollo-server-micro'

import { fetchPokemons } from '../client'

export const typeDefs = gql`
  type Query {
    pokemonCollection: [Pokemon!]!,
    pokemon (name: String!): Pokemon
  }
`

export const resolvers = {
  Query: {
    pokemonCollection: async () => {
      const data = await fetchPokemons()
      return data.results // [{ name, url }]
    },
    pokemon: (_, { name }, { dataloaders }) => dataloaders.pokemonByName.load(name) // primes dataloader for subsequent resolvers
  }
}

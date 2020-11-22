
import { delegateToSchema, gql } from 'apollo-server-micro'
import { andThen, compose, map, prop } from 'ramda'

import { contentfulSchema } from '../../contentful'

/**
 * Given a mapper function, return a resolver
 * that will apply the mapper function to the result of loading
 * the Pokemon, by name, from the pokemonByName dataloader.
 *
 * This will either return a cached call or make the call.
 * Either way, we do the most performant thing.
 *
 * * Note: name will always be provided by the parent
 *
 * @param {({} => Promise<any>)} mapper - a mapper function
 */
export const loadPokemonAndMapResolver = mapper =>
  (_, args, { dataloaders }) =>
    compose(
      andThen(mapper),
      dataloaders.pokemonByName.load.bind(dataloaders.pokemonByName),
      prop('name')
    )(_)

export const typeDefs = gql`
  type Pokemon {
    id: Int!
    name: String!
    weight: Int!
    spriteUrl: String!
    types: [String!]!
    blogs: Contentful_PokemonBlogCollection
  }
`

export const resolvers = {
  Pokemon: {
    id: loadPokemonAndMapResolver(
      prop('id')
    ),
    name: loadPokemonAndMapResolver(
      prop('name')
    ),
    weight: loadPokemonAndMapResolver(
      prop('weight')
    ),
    spriteUrl: loadPokemonAndMapResolver(
      compose(
        prop('front_default'),
        prop('sprites')
      )
    ),
    types: loadPokemonAndMapResolver(
      // Only want the name of each type
      compose(
        map(prop('name')),
        map(prop('type')),
        prop('types')
      )
    ),
    blogs: async ({ name }, args, context, info) => delegateToSchema({
      schema: await contentfulSchema,
      operation: 'query',
      fieldName: 'pokemonBlogCollection',
      args: {
        where: {
          name
        },
        order: 'sys_firstPublishedAt_DESC'
      },
      context,
      info
    })
  }
}

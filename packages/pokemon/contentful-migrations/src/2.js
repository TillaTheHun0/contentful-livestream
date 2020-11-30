
const { ApolloClient, HttpLink, InMemoryCache, gql } = require('@apollo/client')
const fetch = require('cross-fetch')

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://pokemon-lover.vercel.app/api/graphql', fetch }),
  cache: new InMemoryCache()
})

const POKEMON_TYPES_QUERY = gql`
  query GetPokemonTypes ($name: String!) {
    pokemon (name: $name) {
      name
      types
    }
  }
`

const POKEMON_BLOG_TYPE = 'pokemonBlog'
const RELATED_TYPES_FIELD = 'relatedPokeTypes'

// @ts-check
/** @type {import('contentful-migration').MigrationFunction} */
module.exports = async function (migration) {
  const pokemonBlogType = migration.editContentType(POKEMON_BLOG_TYPE)
  pokemonBlogType.createField(RELATED_TYPES_FIELD)
    .name('Related Poke Types')
    .type('Array')
    .items({
      type: 'Symbol',
      validations: [
        {
          in: [
            'bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 'flying', 'ghost',
            'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'
          ]
        }
      ]
    })

  try {
    migration.transformEntries({
      contentType: POKEMON_BLOG_TYPE,
      from: ['name'],
      to: [RELATED_TYPES_FIELD],
      transformEntryForLocale: async (from, locale) => {
        // Fetch pokemon types from our graph
        const { data } = await client.query({ query: POKEMON_TYPES_QUERY, variables: { name: from.name[locale] } })
        const types = data.pokemon.types

        return {
          [RELATED_TYPES_FIELD]: types
        }
      }
    })
  } catch (err) {
    console.error(err)
    pokemonBlogType.deleteField()
  }
}

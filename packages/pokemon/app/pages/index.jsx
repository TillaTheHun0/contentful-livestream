
import { gql } from '@apollo/client'
import { Box, SimpleGrid } from '@chakra-ui/react'

import { initApolloClient } from '../src/apollo/client'
import { PokeCard } from '../src/components/PokeCard'

export default function Home ({ pokemonCollection }) {
  console.log(pokemonCollection)
  return (
    <Box mt={4} borderTopLeftRadius={40} backgroundColor='white'>
      <Box padding={10}>
        <SimpleGrid columns={5} spacing={10}>
          {pokemonCollection.map(pokemon => <PokeCard key={pokemon.name} {...pokemon} />)}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export async function getServerSideProps () {
  const client = initApolloClient()

  const res = await client.query({
    query: gql`
      query GetPokemonAndContent {
        pokemonCollection {
          name
          types
          weight
          spriteUrl
        }
      }
    `
  })

  return {
    props: res.data
  }
}

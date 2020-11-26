
import { gql, useQuery } from '@apollo/client'
import { Box, SimpleGrid, Link } from '@chakra-ui/react'

import { compose, isEmpty, juxt, not, nth, pathOr } from 'ramda'

import { PokeCard } from '../src/components/PokeCard'
import { SkeletonPokeCard } from '../src/components/SkeletonPokeCard'

const LinkedPokeCard = ({ pokemon }) => {
  const [latestBlog, hasBlogs] = compose(
    juxt([nth(0), compose(not, isEmpty)]),
    pathOr([], ['blogs', 'items'])
  )(pokemon)

  if (hasBlogs) {
    return <Link href={`/blogs/${encodeURIComponent(latestBlog.slug)}`}><PokeCard {...pokemon} hasBlogs={hasBlogs} /></Link>
  }

  return <PokeCard {...pokemon} hasBlogs={hasBlogs} />
}

const GET_POKEMON_AND_CONTENT = gql`
  query GetPokemonAndContent {
    pokemonCollection {
      name
      types
      weight
      spriteUrl
      blogs {
        items {
          slug
        }
      }
    }
  }
`

export default function Home () {
  const { loading, data = {} } = useQuery(GET_POKEMON_AND_CONTENT)

  const { pokemonCollection = [] } = data

  return (
    <Box mt={4} borderTopLeftRadius={40} backgroundColor='white'>
      <Box padding={10} minHeight='100vh'>
        {
          !!pokemonCollection.length && (
            <SimpleGrid columns={5} spacing={10}>
              {pokemonCollection.map(pokemon => <LinkedPokeCard key={pokemon.name} pokemon={pokemon} />)}
            </SimpleGrid>
          )
        }
        {
          loading && (
            <Box mt={10}>
              <SimpleGrid columns={5} spacing={10}>
                <SkeletonPokeCard />
                <SkeletonPokeCard />
                <SkeletonPokeCard />
                <SkeletonPokeCard />
                <SkeletonPokeCard />
              </SimpleGrid>
            </Box>
          )
        }
      </Box>
    </Box>
  )
}

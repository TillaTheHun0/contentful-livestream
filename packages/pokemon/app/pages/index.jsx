
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Box, SimpleGrid, Link } from '@chakra-ui/react'
import useInfiniteScroll from 'react-infinite-scroll-hook'

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
  query GetPokemonAndContent ($offset: Int, $limit: Int) {
    pokemonCollection (offset: $offset, limit: $limit) {
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

const pageSize = 30

export default function Home () {
  const { loading, data = {}, fetchMore } = useQuery(GET_POKEMON_AND_CONTENT, {
    variables: {
      offset: 0,
      limit: pageSize
    }
  })
  const [page, setNextPage] = useState(1) // start on second page
  const [loadingPage, setLoadingPage] = useState(false)

  const { pokemonCollection = [] } = data

  async function nextPage () {
    setLoadingPage(true)

    await fetchMore({
      variables: {
        offset: pageSize * page,
        limit: pageSize
      }
    })

    setLoadingPage(false)
    setNextPage(page + 1)
  }

  const infiniteRef = useInfiniteScroll({
    loading: loading || loadingPage,
    hasNextPage: true,
    onLoadMore: nextPage,
    threshold: 500
  })

  return (
    <Box mt={4} borderTopLeftRadius={40} backgroundColor='white'>
      <Box padding={10} minHeight='100vh' ref={infiniteRef}>
        {
          !!pokemonCollection.length && (
            <SimpleGrid columns={5} spacing={10}>
              {pokemonCollection.map(pokemon => <LinkedPokeCard key={pokemon.name} pokemon={pokemon} />)}
            </SimpleGrid>
          )
        }
        {
          (loading || loadingPage) && (
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

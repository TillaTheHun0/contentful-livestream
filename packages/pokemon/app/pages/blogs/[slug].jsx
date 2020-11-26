
import { gql, useQuery } from '@apollo/client'
import { Box, Center, Divider, Heading, SimpleGrid, Spinner } from '@chakra-ui/react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { compose, isEmpty, lensPath, nth, view } from 'ramda'

import { initApolloClient } from '../../src/apollo/client'
import { BlogCard } from '../../src/components/BlogCard'

const blogsLens = lensPath(['data', 'pokemonBlogCollection', 'items'])

const GET_RELATED_BLOGS = gql`
  query GetRelatedBlogs ($name: String!, $currentSlug: String!) {
    pokemonBlogCollection (
      where: {
        AND: {
          name: $name,
          slug_not: $currentSlug
        }
      }
      order: sys_firstPublishedAt_DESC
    ) {
      items {
        sys {
          firstPublishedAt
        }
        name
        title
        slug
      }
    }
  }
`

export default function Blog ({ blog }) {
  const { title, content, name, slug } = blog

  const { data, loading } = useQuery(GET_RELATED_BLOGS, { variables: { name, currentSlug: slug } })

  return (
    <Box minHeight='100vh' mt={4} borderTopLeftRadius={40} backgroundColor='white'>
      <Box p={10}>
        <Heading>{title}</Heading>
        <Divider my={4} />
        {documentToReactComponents(content.json)}
        <Divider my={4} />
        <Heading my={4}>Related Blog Posts</Heading>
        {loading
          ? <Center><Spinner size='xl' color='teal.400' /></Center>
          : (
            <SimpleGrid columns={5} spacing={10}>
              {data.pokemonBlogCollection.items.map(blog => <BlogCard key={blog.slug} {...blog} />)}
            </SimpleGrid>
            )}
      </Box>
    </Box>
  )
}

export async function getServerSideProps ({ params }) {
  const client = initApolloClient()

  const { slug } = params

  const res = await client.query({
    query: gql`
      query GetPokemonBlog ($slug: String!) {
        pokemonBlogCollection (
          where: {
            slug: $slug
          }
        ) {
          items {
            sys {
              firstPublishedAt
            }
            name
            slug
            title
            content {
              json
            }
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: {
      slug
    }
  })

  // 404
  if (compose(
    isEmpty,
    view(blogsLens)
  )(res)) {
    return {
      notFound: true
    }
  }

  return {
    props: compose(
      blog => ({ blog }),
      nth(0),
      view(blogsLens)
    )(res)
  }
}

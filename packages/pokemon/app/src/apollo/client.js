
import { ApolloClient, InMemoryCache } from '@apollo/client'

export const createClient = () => new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${process.env.VERCEL_URL}/api/graphql`
})

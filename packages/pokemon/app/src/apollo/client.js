
import { ApolloClient, InMemoryCache } from '@apollo/client'

let client

function getUrl () {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}/api/graphql`
  }

  const protocol = process.env.VERCEL_ENV === 'development' ? 'http' : 'https'

  return `${protocol}://${process.env.VERCEL_URL}/api/graphql`
}

/**
 * @returns {ApolloClient}
 */
export const initApolloClient = () => {
  if (client) {
    return client
  }

  client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: getUrl()
  })

  return client
}

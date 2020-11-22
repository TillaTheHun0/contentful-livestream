
import { ApolloServer } from 'apollo-server-micro'
import { reduce } from 'ramda'

import { getSchema, contexters } from './schemas'

export default async (req, res) => {
  const apolloServer = new ApolloServer({
    schema: await getSchema(),
    playground: true,
    introspection: true,
    context: microContext => reduce(
      async (prevContext, contexter) => contexter(await prevContext),
      microContext,
      contexters
    )
  })

  return apolloServer.createHandler({ path: '/api/graphql' })(req, res)
}

export const config = {
  api: {
    bodyParser: false
  }
}

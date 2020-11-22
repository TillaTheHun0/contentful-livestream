
import React from 'react'
import { ApolloProvider } from '@apollo/client'

import { createClient } from '../apollo/client'

const client = createClient()

export const withApollo = Component => {
  const WithApollo = ({ ...props }) => (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  )

  WithApollo.displayName = `WithApollo(${Component.displayName || Component.name || 'Component'})`

  return WithApollo
}

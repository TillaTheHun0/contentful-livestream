
import React from 'react'
import { ApolloProvider } from '@apollo/client'

import { initApolloClient } from '../apollo/client'

const client = initApolloClient()

export const withApollo = Component => {
  const WithApollo = ({ ...props }) => (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  )

  WithApollo.displayName = `WithApollo(${Component.displayName || Component.name || 'Component'})`

  return WithApollo
}

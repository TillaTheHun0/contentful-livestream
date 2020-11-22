
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import { theme as defaultTheme } from '../theme'

export const withTheme = (theme = defaultTheme) => Component => {
  const WithTheme = ({ ...props }) => (
    <ChakraProvider theme={theme}>
      <Component {...props} />
    </ChakraProvider>
  )

  WithTheme.displayName = `WithTheme(${Component.displayName || Component.name || 'Component'})`

  return WithTheme
}

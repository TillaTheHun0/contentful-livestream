
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

import { theme } from '../src/theme'

export default function App ({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </ChakraProvider>
  )
}

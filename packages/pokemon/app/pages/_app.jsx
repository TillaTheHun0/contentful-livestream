
import React from 'react'

import { compose } from 'ramda'
import { AnimatePresence } from 'framer-motion'

import { Layout } from '../src/components/Layout'
import { withApollo } from '../src/hoc/withApollo'
import { withTheme } from '../src/hoc/withTheme'

const App = ({ Component, pageProps, router }) => (
  <Layout>
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  </Layout>
)

export default compose(
  withApollo,
  withTheme()
)(App)

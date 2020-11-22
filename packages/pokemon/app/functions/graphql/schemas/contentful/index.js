
import { introspectSchema, wrapSchema, RenameTypes } from '@graphql-tools/wrap'
import { print } from 'graphql'
import got from 'got'
import { compose } from 'ramda'

import { CONTENTFUL_MANAGEMENT_API_KEY, CONTENTFUL_SPACE_ID, CONTENTFUL_SPACE_ENVIRONMENT } from './config'

async function fetchContent ({ query, variables }) {
  return got(
    `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_SPACE_ENVIRONMENT}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CONTENTFUL_MANAGEMENT_API_KEY}`
      },
      body: JSON.stringify({ query, variables })
    }
  ).json()
}

function executor ({ document, variables }) {
  return compose(
    fetchContent,
    ({ document, variables }) => ({ query: print(document), variables })
  )({ document, variables })
}

export const getContenfulSchema = async () => {
  return wrapSchema({
    schema: await introspectSchema(executor),
    executor,
    transforms: [
      new RenameTypes(name => {
        return `Contentful_${name}`
      })
    ]
  })
}

export const contentfulSchema = getContenfulSchema()

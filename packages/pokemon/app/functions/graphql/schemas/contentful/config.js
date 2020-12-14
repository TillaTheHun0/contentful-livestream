
export const CONTENTFUL_MANAGEMENT_API_KEY = process.env.CONTENTFUL_MANAGEMENT_API_KEY
export const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID

/**
 * * Gitflow branch name mapping ie. feat/foo/feature -> feat-foo-feature
 */
export const CONTENTFUL_SPACE_ENVIRONMENT = process.env.CONTENTFUL_SPACE_ENVIRONMENT || `GH-${process.env.VERCEL_GIT_COMMIT_REF.replace(/\//g, '-')}`

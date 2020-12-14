
# Contentful Livestream

This repo contains live code used for [Contentful CI/CD with Github Actions](https://www.youtube.com/watch?v=6FOnxtRgXk8&feature=youtu.be) Live stream

## Getting Started

- `yarn@1`
- `node@14`

If you use `nvm`, there is a `.nvmrc` file at the root of the repo that specifies a compatible node version (run `nvm use`)

You will also need a `.env` file that contains the following values:

```text
VERCEL_URL="localhost:3000"
VERCEL_ENV="development"
VERCEL_GITHUB_COMMIT_REF=""
CONTENTFUL_SPACE_ENVIRONMENT="master"
CONTENTFUL_MANAGEMENT_API_KEY="your_management_key"
CONTENTFUL_SPACE_ID="your_space_id"
```

Run `yarn && yarn dev` to run the project locally

In your Github Repo, set secrets for `CONTENTFUL_MANAGEMENT_API_KEY` and `CONTENTFUL_SPACE_ID`. These are used by Github Actions CI

## Tech

- Contentful
- Yarn
- Lerna
- React
- Vercel
- Chakra-UI
- Github Actions

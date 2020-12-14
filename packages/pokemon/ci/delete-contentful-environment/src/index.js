
const core = require('@actions/core')
const github = require('@actions/github')
const { createClient } = require('contentful-management')

function normalizeBranch (branchName) {
  return branchName
    .replace('refs/heads/', '')
    // normalize git-flow branch names ie. feat/foo-feature -> feat-foo-feature
    .replace(/\//g, '-')
}

async function run (context) {
  const branchName = context.payload.pull_request.head.ref

  const SPACE_ID = process.env.SPACE_ID
  const MANAGEMENT_API_KEY = process.env.MANAGEMENT_API_KEY

  try {
    const environmentName = `GH-${normalizeBranch(branchName)}`
    core.info(`Checking for Contentful Environment ${environmentName}...`)

    const client = createClient({
      accessToken: MANAGEMENT_API_KEY
    })

    const space = await client.getSpace(SPACE_ID)

    const environment = await space.getEnvironment(environmentName)

    if (environment) {
      await environment.delete()
      core.info(`Deleted Contentful Environment ${environmentName}`)
      core.setOutput('environment_name', environmentName)
    } else {
      core.info(`No Contentful Environment with name ${environmentName} found. Doing nothing`)
    }
  } catch (err) {
    core.error(err.message)
    throw err
  }
}

run(github.context)


import micro from 'micro'
import { agent } from 'supertest'

import handler from '.'

describe('healtheck', () => {
  const server = micro(handler)

  it('should respond with a 200', done => {
    agent(server)
      .get('')
      .expect(200)
      .end(done)
  })
})

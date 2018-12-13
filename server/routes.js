import signinRouter from './api/controllers/signin/router'
import examplesRouter from './api/controllers/examples/router'
import usersRouter from './api/controllers/users/router'
import { initializePassport, requireAuth, requireSignin } from './passport'

export default function routes (app) {
  initializePassport(app)

  app.use('/api/v1/signin', requireSignin, signinRouter)
  app.use('/api/v1/examples', requireAuth, examplesRouter)
  app.use('/api/v1/users', usersRouter)
}

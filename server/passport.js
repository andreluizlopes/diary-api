import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jwt-simple'
import authService from '../server/api/services/authentication.service'
import userService from '../server/api/services/users.service'

const tokenForUser = user => {
  const timestamp = new Date().getTime()
  const userDataToken = { username: user.username, id: user._id }
  return jwt.encode({ sub: userDataToken, iat: timestamp }, 'secret')
}

passport.use('local-signin',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, cb) => {
    if (email.replace(/.*@/, '') === 'guest.com') {
      console.log('WIP: guest user')
      const user = {
        email,
        password: email,
        username: email
      }
      userService.create(user).then(user => {
        console.log(user)
        const token = tokenForUser(user)
        const logedUser = { id: user._id, user: user.email, token }
        cb(null, logedUser)
      })
    }
    return authService.byEmail(email)
      .then(user => {
        if (!user) {
          cb(null, false)
        } else {
          bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
              cb(err, false)
            }
            if (!match) {
              cb(null, false)
            }
            if (match) {
              const token = tokenForUser(user)
              const logedUser = {
                id: user._id,
                user: user.username,
                token
              }
              cb(null, logedUser)
            }
          })
        }
      })
      .catch(err => cb(err))
  }
  )
)

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: 'secret'
}

passport.use(
  new JwtStrategy(jwtOptions, (payload, cb) =>
    authService.byId(payload.sub.username)
      .then(user => {
        if (user) {
          const userDataToken = {
            username: user.username,
            id: user._id
          }
          cb(null, userDataToken)
        }
        if (!user) {
          cb(null, false)
        }
      })
      .catch(err => cb(err, false))
  )
)

export const requireAuth = passport.authenticate('jwt', { session: false })

export const requireSignin = (req, res, next) =>
  passport.authenticate('local-signin', (err, user, info) => {
    if (err) {
      res.status(501).send(err)
    }
    if (!user) {
      res.status(401).end()
    }
    if (user) {
      res.status(201).send(user)
    }
  })(req, res, next)

export const initializePassport = app => {
  app.use(passport.initialize())
  app.use(passport.session())
}

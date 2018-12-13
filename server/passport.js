import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jwt-simple'
import authService from '../server/api/services/authentication.service'

const tokenForUser = user => {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.username, iat: timestamp }, 'secret')
}

passport.use('local-signin',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, cb) =>
    authService.byEmail(email)
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
                user: user.username,
                token
              }
              cb(null, logedUser)
            }
          })
        }
      })
      .catch(err => cb(err))
  )
)

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: 'secret'
}

passport.use(
  new JwtStrategy(jwtOptions, (payload, cb) => {
    console.log(payload)

    return authService.byId(payload.sub)
      .then(user => {
        if (user) {
          cb(null, user)
        }
        if (!user) {
          cb(null, false)
        }
      })
      .catch(err => cb(err, false))
  }
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

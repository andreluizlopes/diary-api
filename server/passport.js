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
    authService.auth(email)
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
              cb(null, { user, token })
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
  new JwtStrategy(jwtOptions, (payload, cb) =>
    authService.byId(payload.sub)
      .then(user => {
        if (user) {
          cb(null, user)

        }
        if (!user) {
          cb(null, false)
        }
      })
      .catch(err => cb(err, false))
  )
)

passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function (user, cb) {
  const userX = {
    username: 90,
    name: 'ha'
  }
  cb(null, userX)
})

export const requireAuth = passport.authenticate('jwt', { session: false })

export const requireSignin = (req, res, next) =>
  passport.authenticate('local-signin', function (err, user, info) {
    if (err) {
      // return next(err) will generate a 500 error
      res.status(501).send(err)
    }
    res.status(201).send(user)
  })(req, res, next)

export const initializePassport = app => {
  app.use(passport.initialize())
  app.use(passport.session())
}

// const passport = require('passport')
// const JwtStrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt
// const LocalStrategy = require('passport-local')
// // const User = require('../models/user')
// // const config = require('../config')

// // Create local strategy
// const localOptions = { usernameField: 'email' }
// const LocalLogin = new LocalStrategy(localOptions, function (email, password, done) {
//   // Verify this email and password, call done with the user
//   // if it is the correct email and password
//   // otherwise, call done with false
//   /* User.findOne({ email: email }, function (err, user) {
//     if (err) { return done(err) }
//     if (!user) { return done(null, false) }

//     // compare passwords - is `password` equal to user.password?
//     user.comparePassword(password, function (err, isMatch) {
//       if (err) { return done(null, false) }
//       if (!isMatch) { return done(null, false) }

//       return done(null, user)
//     })
//   }) */

//   return done(null, 'user')
// })

// // Setup options for JWT Strategy
// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//   secretOrKey: 'config.secret'
// }

// // Create JWT strategy
// const jwtlogin = new JwtStrategy(jwtOptions, function (payload, done) {
//   // See if the user ID in the payload exists in our database
//   // If it does, call 'done' with that other
//   // otherside, call done without a user object
//   User.findById(payload.sub, function (err, user) {
//     if (err) { return done(err, false) }

//     if (user) {
//       done(null, user)
//     }
//     if (!user) {
//       done(null, false)
//     }
//   })
// })

// // Tell passport to use this strategy
// passport.use(jwtlogin)
// passport.use(LocalLogin)

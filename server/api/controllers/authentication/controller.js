import jwt from 'jwt-simple'
import AuthService from '../../services/authentication.service'

const tokenForUser = user => {
  console.log(user)
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, 'config.secret')
}

export class Controller {
  signin (req, res) {
    AuthService
      .byEmail(req.params.email)
      .then(r => {
        console.log(r)
        if (r) res.json(r)
        else res.status(404).end()
      })
  }

  all (req, res) {
    AuthService.all()
      .then(r => res.json(r))
  }

  byId (req, res) {
    AuthService
      .byId(req.params.id)
      .then(r => {
        console.log(r)
        if (r) res.json(r)
        else res.status(404).end()
      })
  }

  create (req, res) {
    AuthService
      .create(req.body)
      .then(r => res
        .status(201)
        .location(`/api/v1/users/${r.id}`)
        .json(r)
      )
  }
}
export default new Controller()

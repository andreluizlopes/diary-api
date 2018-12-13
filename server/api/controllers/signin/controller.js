import AuthService from '../../services/authentication.service'

export class Controller {
  signin (req, res) {
    console.log('signin controller', req)
    return AuthService
      .byEmail(req.body.email)
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
      .create(req.body.email)
      .then(r => res
        .status(201)
        .location(`/api/v1/users/${r.id}`)
        .json(r)
      )
  }
}
export default new Controller()

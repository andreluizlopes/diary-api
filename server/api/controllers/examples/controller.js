import ExamplesService from '../../services/examples.service'

export class Controller {
  all (req, res) {
    ExamplesService.all(req.user)
      .then(r => res.json(r))
  }

  byId (req, res) {
    ExamplesService
      .byId(req.params.id)
      .then(r => {
        if (r) res.json(r)
        else res.status(404).end()
      })
  }

  create (req, res) {
    const userID = { user_id: req.user.id }
    const diaryPost = Object.assign(userID, req.body)
    ExamplesService
      .create(diaryPost)
      .then(r => res
        .status(201)
        .location(`/api/v1/examples/${r.id}`)
        .json(r))
  }
}
export default new Controller()

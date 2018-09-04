import ExamplesService from '../../services/examples.service';

export class Controller {
  all(req, res) {
    console.log(ExamplesService.all());
    ExamplesService.all()
      .then(r => res.json(r));
  }

  byId(req, res) {
    ExamplesService
      .byId(req.params.id)
      .then(r => {
        console.log(r);
        if (r) res.json(r);
        else res.status(404).end();
      });
  }

  create(req, res) {
    ExamplesService
      .create(req.body.text)
      .then(r => res
        .status(201)
        .location(`/api/v1/examples/${r.id}`)
        .json(r));
  }
}
export default new Controller();

import UsersService from '../../services/users.service';

export class Controller {
  all(req, res) {
    console.log(UsersService.all());
    UsersService.all()
      .then(r => res.json(r));
  }

  byId(req, res) {
    UsersService
      .byId(req.params.id)
      .then(r => {
        console.log(r);
        if (r) res.json(r);
        else res.status(404).end();
      });
  }

  create(req, res) {
    UsersService
      .create(req.body)
      .then(r => res
        .status(201)
        .location(`/api/v1/users/${r.id}`)
        .json(r)
      );
  }
}
export default new Controller();

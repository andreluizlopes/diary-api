import l from '../../common/logger';
import db from './users.db.service';

class ExamplesService {
  all() {
    l.info(`${this.constructor.name}.all()`);
    return db.all();
  }

  byId(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    return db.byId(id);
  }

  create(user) {
    return db.insert(user);
  }
}

export default new ExamplesService();

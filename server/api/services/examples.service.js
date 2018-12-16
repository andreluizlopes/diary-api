import l from '../../common/logger'
import db from './examples.db.service'

class ExamplesService {
  all (user_id) {
    l.info(`${this.constructor.name}.all()`)
    return db.all(user_id)
  }

  byId (id) {
    l.info(`${this.constructor.name}.byId(${id})`)
    return db.byId(id)
  }

  create (text) {
    return db.insert(text)
  }
}

export default new ExamplesService()

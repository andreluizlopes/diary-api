import l from '../../common/logger'
import db from './authentication.db.service'

class ExamplesService {
  signin () {
    return db.signin()
  }
  all () {
    l.info(`${this.constructor.name}.all()`)
    return db.all()
  }

  byId (id) {
    l.info(`${this.constructor.name}.byId(${id})`)
    return db.byId(id)
  }

  auth (email, password) {
    l.info(`${this.constructor.name}.auth(${email})`)
    return db.auth(email, password)
  }

  create (user) {
    return db.insert(user)
  }
}

export default new ExamplesService()

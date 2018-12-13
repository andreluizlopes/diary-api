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

  byEmail (email) {
    l.info(`${this.constructor.name}.byEmail(${email})`)
    return db.byEmail(email)
  }

  create (user) {
    return db.insert(user)
  }
}

export default new ExamplesService()

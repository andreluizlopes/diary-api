import { get as getDB } from '../../common/db'

class AuthDatabase {
  constructor () {
    this._data = []
    this.collection = 'users'
  }

  async all () {
    const collection = getDB().collection(this.collection)

    return collection.find().toArray()
  }

  signin () {
    return Promise.resolve(true)
  }

  auth (email) {
    return this.byEmail(email)

    // collection.findOne({ email }).then( user => {
    //   // bcrypt.compare(password, user.password)
    //   //   .then(res => console.log(res))
    //   //   .catch(err => console.log(err))
    //   // const match = bcrypt.compare(password, user.password)
    //   //   .then(res => res)
    //   //   .catch(err => err)

    //   return { user }
    // })
  }

  byEmail (email) {
    const collection = getDB().collection(this.collection)
    return collection.findOne({
      email
    })
  }

  byId (username) {
    const collection = getDB().collection(this.collection)
    return collection.findOne({
      username: username
    })
  }

  insert (user) {
    if (getDB()) {
      const collection = getDB().collection(this.collection)
      collection.save(user, (err, result) => {
        if (err) return console.log(err)
      })
    }

    return Promise.resolve(user)
  }
}

export default new AuthDatabase()

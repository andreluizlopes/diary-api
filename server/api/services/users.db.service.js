import bcrypt from 'bcrypt-nodejs'
import { get as getDB } from '../../common/db'

class ExamplesDatabase {
  constructor () {
    this._data = []
    this.collection = 'users'
  }

  async all () {
    const collection = getDB().collection(this.collection)

    return collection.find().toArray()
  }

  byId (id) {
    const collection = getDB().collection(this.collection)
    return collection.find({
      id: parseInt(id)
    }).toArray()
    return Promise.resolve(this._data[id])
  }

  insert (user) {
    console.log(user)
    bcrypt.hash(user.password, null, null, (err, hash) => {
      user.password = hash
      const collection = getDB().collection(this.collection)
      collection.save(user, (err, result) => {
        if (err) return console.log(err)
      })
    })

    return Promise.resolve(user)
  }
}

export default new ExamplesDatabase()

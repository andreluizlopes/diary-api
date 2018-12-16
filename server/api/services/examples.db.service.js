import { get as getDB } from '../../common/db'

class ExamplesDatabase {
  constructor () {
    this._data = []
  }

  async all(user) {
    const collection = getDB().collection('diary-post')
    return collection.find({
      user_id: user.id
    }).sort({ _id: -1 }).toArray()
  }

  byId (id) {
    const collection = getDB().collection('diary-post')
    return collection.find({
      id: parseInt(id)
    }).toArray()
    return Promise.resolve(this._data[id])
  }

  insert (example) {
    const collection = getDB().collection('diary-post')
    collection.insertOne(example, (err, result) => {
      if (err) return console.log(err)
    })

    return Promise.resolve(example)
  }
}

export default new ExamplesDatabase()

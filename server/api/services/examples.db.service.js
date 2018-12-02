import { get as getDB } from '../../common/db';

class ExamplesDatabase {
  constructor() {
    this._data = []
  }

  async all() {
    const collection = getDB().collection('diary-post')

    return collection.find().sort({ _id: -1 }).toArray();
  }

  byId(id) {
    const collection = getDB().collection('diary-post');
    return collection.find({
      id: parseInt(id)
    }).toArray();
    return Promise.resolve(this._data[id]);
  }

  insert(example) {
    if (getDB()) {
      const collection = getDB().collection('diary-post');
      collection.save(example, (err, result) => {
        if (err) return console.log(err)
      });
    }

    return Promise.resolve(example);
  }
}

export default new ExamplesDatabase();

import { get as getDB } from '../../common/db';

class ExamplesDatabase {
  constructor() {
    this._data = [];

    this.insert('example 0');
    this.insert('example 1');
  }

  async all() {
    const collection = getDB().collection('diary-post');

    return collection.find().toArray();
  }

  byId(id) {
    console.log(id);
    const collection = getDB().collection('diary-post');
    return collection.find({
      id: parseInt(id)
    }).toArray();
    return Promise.resolve(this._data[id]);
  }

  insert(text) {
    console.log(text);
    const record = {
      text
    };

    if (getDB()) {
      const collection = getDB().collection('diary-post');
      collection.save(record, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to databaseaaaa');
      });
    }

    return Promise.resolve(record);
  }
}

export default new ExamplesDatabase();

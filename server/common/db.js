import { MongoClient } from 'mongodb';

const state = {
  db: null,
}

export function connect(url, dbName, done) {
  if (state.db) return done()

  MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) return done(err)
    state.db = db.db(dbName);
    done()
  })
}

export function get() {
  return state.db
}

export function close(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}
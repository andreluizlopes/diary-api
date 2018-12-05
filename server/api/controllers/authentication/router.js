import * as express from 'express'
import controller from './controller'

export default express
  .Router()
  .post('/', controller.signin)
  .get('/', controller.signin)
  .get('/:id', controller.signin)

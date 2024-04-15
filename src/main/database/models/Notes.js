import { Schema } from 'mongoose'
import { getConnection } from '../connection.js'

const notesSchema = new Schema(
  {
    content: { type: Object, required: true }
  },
  {
    timestamps: true
  }
)

export default getConnection().model('notes', notesSchema)

import Notes from '../database/models/Notes'

const saveNote = async (event, args) => {
  try {
    let note = await Notes.create({
      content: args
    })
    note = note.toJSON()
    return note
  } catch (error) {
    return error
  }
}
const updateNote = async (event, args) => {
  try {
    let note = await Notes.findById(args._id)
    if (!note) {
      throw new Error('Note not found')
    }
    delete args._id
    await note.updateOne({
      content: args
    })

    return args
  } catch (error) {
    console.log(error)
  }
}
const deleteNote = async (event, args) => {
  try {
    let note = await Notes.findById(args._id)
    if (!note) {
      throw new Error('Note not found')
    }
    await note.deleteOne()
    return {
      _id: args._id
    }
  } catch (error) {
    console.log(error)
  }
}
const getNotes = async () => {
  try {
    let notes = await Notes.find()
    notes = JSON.parse(JSON.stringify(notes))
    return notes
  } catch (error) {
    return error
  }
}
export { saveNote, getNotes, updateNote, deleteNote }

import { deleteNote, getNotes, saveNote, updateNote } from './services/notesServices'

const routes = (ipcMain) => {
  ipcMain.handle('saveNote', saveNote)
  ipcMain.handle('getNotes', getNotes)
  ipcMain.handle('updateNote', updateNote)
  ipcMain.handle('deleteNote', deleteNote)
}
export default routes

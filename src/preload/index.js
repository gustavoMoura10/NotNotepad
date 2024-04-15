import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  saveNote: async (...args) => ipcRenderer.invoke('saveNote', ...args),
  getNotes: async () => ipcRenderer.invoke('getNotes'),
  updateNote: async (...args) => ipcRenderer.invoke('updateNote', ...args),
  deleteNote: async (...args) => ipcRenderer.invoke('deleteNote', ...args)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

try {
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../assets/components/Notes.css'
import { noteAtom } from '../store'
import { useAtom } from 'jotai'

export function Note({ value, originalObject, getNotes }) {
  // eslint-disable-next-line no-unused-vars
  const [note, setNote] = useAtom(noteAtom)
  async function deleteNote() {
    try {
      await window.api.deleteNote({
        _id: originalObject._id
      })
      await getNotes()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="note">
      <div className="content-note">{value}</div>
      <button className="delete-note" onClick={deleteNote}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button
        className="edit-note"
        onClick={() => {
          setNote(originalObject)
        }}
      >
        <FontAwesomeIcon icon={faPencil} />
      </button>
    </div>
  )
}

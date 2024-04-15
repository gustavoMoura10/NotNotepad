import ReactQuill from 'react-quill'
import '../assets/components/Notepad.css'
import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { noteAtom } from '../store'
import { useAtom } from 'jotai'

export default function Notepad({ getNotes }) {
  const [note, setNote] = useAtom(noteAtom)
  const [text, setText] = useState('')
  const [deltaContent, setDeltaContent] = useState('')
  useEffect(() => {
    if (note) {
      setText(note.content)
    }
  }, [note])
  const handleChange = (html, delta, source, editor) => {
    setText(html)
    setDeltaContent(editor.getContents())
  }
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ['right', 'center', 'justify'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ color: ['red', '#785412'] }],
      [{ background: ['red', '#785412'] }]
    ]
  }
  const formats = [
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'header',
    'blockquote',
    'code-block',
    'indent',
    'list',
    'direction',
    'align',
    'link',
    'image',
    'video',
    'formula'
  ]

  async function saveContent() {
    try {
      await window.api.saveNote(deltaContent)
      await getNotes()
    } catch (error) {
      console.log(error)
    }
  }
  async function updateContent() {
    try {
      await window.api.updateNote({
        _id: note._id,
        ...deltaContent
      })
      await getNotes()
    } catch (error) {
      console.log(error)
    }
  }
  async function clearContent() {
    try {
      setText('')
      if (note) {
        setNote(null)
      }
    } catch (error) {
      console.log(error)
    }
  }
  function newNote() {
    setNote(null)
    setText('')
    setDeltaContent(null)
  }
  return (
    <div className="notepad">
      <div className="notepad-actions">
        <button onClick={note ? updateContent : saveContent}>{note ? 'Update' : 'Save'}</button>
        <button onClick={note ? newNote : clearContent}>{note ? 'New Note' : 'Clear'}</button>
      </div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={text}
        onChange={handleChange}
      />
    </div>
  )
}

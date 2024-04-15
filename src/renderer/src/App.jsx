import { useEffect, useState } from 'react'
import './assets/App.css'
import Aside from './components/Aside'
import Notepad from './components/Notepad'

function App() {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    ;(async () => {
      try {
        await getNotes()
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  async function getNotes() {
    const result = await window.api.getNotes()
    setNotes(result)
  }
  return (
    <>
      <div className="app">
        <Aside notes={notes} getNotes={getNotes} />
        <Notepad getNotes={getNotes}/>
      </div>
    </>
  )
}

export default App

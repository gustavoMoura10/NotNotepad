import '../assets/components/Aside.css'
import { Note } from './Note'
export default function Aside({ notes, getNotes }) {
  return (
    <div className="aside">
      {notes.map((n) => (
        <Note
          key={JSON.stringify(n)}
          value={
            n.content.ops
              ? n.content.ops[0] && n.content.ops[0].insert
                ? n.content.ops[0].insert
                : ''
              : ''
          }
          getNotes={getNotes}
          originalObject={n}
        />
      ))}
    </div>
  )
}

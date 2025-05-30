import React from 'react'

const notes = [
  'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'
]

export default function MusicalNotes() {
  return (
    <div className="musical-notes">
      <h2>Musical Notes</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={note} className="note-item">
            <span className="note">{note}</span>
            <span className="note-number">{index + 1}</span>
          </li>
        ))}
      </ul>
    </div>
  )
} 
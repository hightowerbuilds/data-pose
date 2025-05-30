import React from 'react'
import { formatTransposedNote, transposeDifferenceToNote } from '../utils/noteTransposition'

interface TransposedNotesProps {
  differences: Array<number>
}

export default function TransposedNotes({ differences }: TransposedNotesProps) {
  const transposedNotes = differences.map((difference, index) => {
    const transposed = transposeDifferenceToNote(difference)
    return {
      ...transposed,
      position: index + 1,
      formattedNote: formatTransposedNote(transposed)
    }
  })

  return (
    <div className="transposed-notes">
      <h2>Transposed Notes</h2>
      <ul>
        {transposedNotes.map(({ note, quality, difference, position, formattedNote }) => (
          <li key={position} className="transposed-item">
            <span className="transposed-note">{formattedNote}</span>
            <span className="transposed-difference">
              {difference > 0 ? `+${difference}` : difference}
            </span>
            <span className="transposed-position">{position}</span>
          </li>
        ))}
      </ul>
    </div>
  )
} 
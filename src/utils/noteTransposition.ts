// Define the note patterns
const notePattern = [
  'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'
] as const

type Note = typeof notePattern[number]

interface TransposedNote {
  note: Note
  quality: 'major' | 'minor'
  difference: number
}

export function transposeDifferenceToNote(difference: number): TransposedNote {
  // Normalize the difference to be within 0-11 range
  const normalizedDiff = ((Math.abs(difference) - 1) % 12)
  const noteIndex = normalizedDiff
  const note = notePattern[noteIndex]
  const quality = difference > 0 ? 'major' : 'minor'
  
  return {
    note,
    quality,
    difference
  }
}

// Helper function to format the note display
export function formatTransposedNote({ note, quality }: TransposedNote): string {
  return `${note} ${quality}`
} 
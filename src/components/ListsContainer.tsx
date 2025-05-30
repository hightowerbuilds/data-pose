import React from 'react'
import MusicalNotes from './MusicalNotes'
import RandomNumbers, { randomNumbers } from './RandomNumbers'
import NumberDifferences from './NumberDifferences'
import TransposedNotes from './TransposedNotes'

export default function ListsContainer() {
  // Calculate differences for the transposed notes
  const differences = randomNumbers.slice(1).map((number, index) => 
    number - randomNumbers[index]
  )

  return (
    <div className="lists-container">
      <MusicalNotes />
      <RandomNumbers />
      <NumberDifferences numbers={randomNumbers} />
      <TransposedNotes differences={differences} />
    </div>
  )
} 
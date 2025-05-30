import React from 'react'

interface NumberDifferencesProps {
  numbers: Array<number>
}

export default function NumberDifferences({ numbers }: NumberDifferencesProps) {
  // Calculate differences between consecutive numbers
  const differences = numbers.slice(1).map((number, index) => {
    const previousNumber = numbers[index]
    const difference = number - previousNumber
    return {
      difference,
      position: index + 1,
      from: previousNumber,
      to: number
    }
  })

  return (
    <div className="number-differences">
      <h2>Number Differences</h2>
      <ul>
        {differences.map(({ difference, position, from, to }) => (
          <li key={position} className="difference-item">
            <span className="difference-value">
              {difference > 0 ? `+${difference}` : difference}
            </span>
            <span className="difference-details">
              {from} → {to}
            </span>
            <span className="difference-position">{position}</span>
          </li>
        ))}
      </ul>
    </div>
  )
} 
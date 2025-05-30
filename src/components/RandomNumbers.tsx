import React from 'react'

// Generate 50 random numbers between 1 and 20
const generateRandomNumbers = () => {
  const numbers = []
  for (let i = 0; i < 50; i++) {
    numbers.push(Math.floor(Math.random() * 20) + 1)
  }
  return numbers
}

// Export the numbers so they can be used by other components
export const randomNumbers = generateRandomNumbers()

export default function RandomNumbers() {
  return (
    <div className="random-numbers">
      <h2>Random Numbers (1-20)</h2>
      <ul>
        {randomNumbers.map((number, index) => (
          <li key={index} className="number-item">
            <span className="number">{number}</span>
            <span className="number-position">{index + 1}</span>
          </li>
        ))}
      </ul>
    </div>
  )
} 
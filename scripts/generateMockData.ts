import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { generateMockBankStatement } from '../src/utils/mockBankData.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Generate the mock data
const statement = generateMockBankStatement()

// Save to a JSON file
const outputPath = resolve(__dirname, '../data/mockBankStatement.json')
writeFileSync(outputPath, JSON.stringify(statement, null, 2))

console.log(`Mock bank statement generated and saved to: ${outputPath}`)
console.log(`Starting Balance: $${statement.startingBalance.toFixed(2)}`)
console.log(`Ending Balance: $${statement.endingBalance.toFixed(2)}`)
console.log(`Number of Transactions: ${statement.transactions.length}`) 
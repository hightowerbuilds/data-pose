export interface Transaction {
  id: string
  date: string
  amount: number
  balance: number
  description: string
  type: 'debit' | 'credit'
}

export interface BankStatement {
  startingBalance: number
  transactions: Transaction[]
  endingBalance: number
}

// List of common transaction descriptions
const descriptions = [
  'Grocery Store',
  'Gas Station',
  'Restaurant',
  'Coffee Shop',
  'Online Shopping',
  'Utility Bill',
  'Phone Bill',
  'Internet Bill',
  'Rent Payment',
  'Salary Deposit',
  'ATM Withdrawal',
  'Transfer',
  'Subscription',
  'Entertainment',
  'Healthcare',
  'Transportation',
  'Education',
  'Insurance',
  'Investment',
  'Gift'
]

// Generate a random date within the last month
function getRandomDate(): string {
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const randomTime = lastMonth.getTime() + Math.random() * (now.getTime() - lastMonth.getTime())
  const date = new Date(randomTime)
  return date.toISOString().split('T')[0]
}

// Generate a random amount between min and max
function getRandomAmount(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2))
}

// Generate a random description
function getRandomDescription(): string {
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

// Generate a random transaction type (debit or credit)
function getRandomType(): 'debit' | 'credit' {
  return Math.random() > 0.4 ? 'debit' : 'credit' // 60% debits, 40% credits
}

export function generateMockBankStatement(
  startingBalance: number = 10000,
  numberOfTransactions: number = 150,
  minAmount: number = 10,
  maxAmount: number = 200
): BankStatement {
  // Generate all dates first and sort them
  const dates = Array.from({ length: numberOfTransactions }, () => getRandomDate())
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

  const transactions: Transaction[] = []
  let currentBalance = startingBalance

  // Generate transactions in chronological order
  for (let i = 0; i < numberOfTransactions; i++) {
    const amount = getRandomAmount(minAmount, maxAmount)
    currentBalance -= amount // Always subtract since all transactions are debits

    transactions.push({
      id: `txn_${i + 1}`,
      date: dates[i],
      amount: amount,
      balance: Number(currentBalance.toFixed(2)),
      description: getRandomDescription(),
      type: 'debit'
    })
  }

  return {
    startingBalance,
    transactions,
    endingBalance: Number(currentBalance.toFixed(2))
  }
}

// Example usage:
// const statement = generateMockBankStatement()
// console.log(JSON.stringify(statement, null, 2)) 
import { useState, useEffect } from 'react'
import { BalanceLineChart } from '../components/charts/BalanceLineChart'
import type { BankStatement } from '../utils/mockBankData'

export default function DataChartsPage() {
  const [bankData, setBankData] = useState<BankStatement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/data/mockBankStatement.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load bank statement data')
        }
        return response.json()
      })
      .then((data: BankStatement) => {
        setBankData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading bank statement data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    )
  }

  if (!bankData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">No bank statement data available</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Data Charts</h1>
      
      <div className="grid gap-8">
        <section className="chart-section">
          <h2 className="text-xl font-semibold mb-4">Transaction History`</h2>
          <div className="chart-container">
            <BalanceLineChart data={bankData} />
          </div>
        </section>
      </div>
    </div>
  )
} 
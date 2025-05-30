import { useState } from 'react'
import type { BankStatement } from '../utils/mockBankData'

interface TransactionListModalProps {
  data: BankStatement
  isOpen: boolean
  onClose: () => void
}

export function TransactionListModal({ data, isOpen, onClose }: TransactionListModalProps) {
  if (!isOpen) return null

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Transaction History</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="transaction-list">
          <div className="transaction-header">
            <div className="transaction-date">Date</div>
            <div className="transaction-description">Description</div>
            <div className="transaction-amount">Amount</div>
            <div className="transaction-balance">Balance</div>
          </div>
          {data.transactions.map((transaction, index) => {
            const amount = transaction.amount
            const balance = transaction.balance
            const isBalanceNegative = balance < 0

            return (
              <div key={index} className="transaction-row">
                <div className="transaction-date">
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
                <div className="transaction-description">
                  {transaction.description}
                </div>
                <div className="transaction-amount">
                  {formatCurrency(amount)}
                </div>
                <div className={`transaction-balance ${isBalanceNegative ? 'negative' : 'positive'}`}>
                  {formatCurrency(balance)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 
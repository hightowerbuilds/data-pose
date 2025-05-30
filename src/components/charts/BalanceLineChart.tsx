import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import type { BankStatement } from '../../utils/mockBankData'
import { TransactionListModal } from '../TransactionListModal'

interface BalanceLineChartProps {
  data: BankStatement
  width?: number
  height?: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

export function BalanceLineChart({
  data,
  width = 1200,
  height = 1100,
  margin = { top: 30, right: 40, bottom: 40, left: 80 }
}: BalanceLineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dateRange, setDateRange] = useState('')

  useEffect(() => {
    if (!svgRef.current || !data) return

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll('*').remove()

    // Prepare the data
    const transactions = data.transactions.map(t => ({
      date: new Date(t.date),
      balance: t.balance
    }))

    // Get date range for title
    const startDate = new Date(Math.min(...transactions.map(t => t.date.getTime())))
    const endDate = new Date(Math.max(...transactions.map(t => t.date.getTime())))
    setDateRange(`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`)

    // Calculate dimensions
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(transactions, d => d.date) as [Date, Date])
      .range([0, innerWidth])

    // Find the maximum absolute balance to make the scale symmetric around zero
    const maxBalance = Math.max(
      Math.abs(d3.min(transactions, d => d.balance) || 0),
      Math.abs(d3.max(transactions, d => d.balance) || 0)
    )

    const yScale = d3.scaleLinear()
      .domain([-maxBalance, maxBalance]) // Make domain symmetric around zero
      .range([innerHeight, 0])
      .nice()

    // Create line generator
    const line = d3.line<typeof transactions[0]>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.balance))
      .curve(d3.curveMonotoneX)

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)')

    // Add Y axis with zero line
    const yAxis = svg.append('g')
      .call(d3.axisLeft(yScale)
        .ticks(10)
        .tickFormat(d => `$${d.toLocaleString()}`))

    // Add a horizontal line at y=0
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', yScale(0))
      .attr('y2', yScale(0))
      .attr('stroke', '#666')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4') // Make it a dashed line

    // Add the line path
    svg.append('path')
      .datum(transactions)
      .attr('fill', 'none')
      .attr('stroke', '#4a9eff')
      .attr('stroke-width', 2)
      .attr('d', line)

    // Add dots for each data point
    svg.selectAll('circle')
      .data(transactions)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.balance))
      .attr('r', 3)
      .attr('fill', '#4a9eff')
      .style('opacity', 0.6)

    // Add tooltip
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', '#2d2d2d')
      .style('border', '1px solid #666')
      .style('padding', '8px')
      .style('pointer-events', 'none')
      .style('font-family', 'Courier New, monospace')
      .style('font-size', '12px')
      .style('color', '#e0e0e0')
      .style('box-shadow', '0 2px 4px rgba(0, 0, 0, 0.3)')

    // Add hover effects
    svg.selectAll<SVGCircleElement, { date: Date; balance: number }>('circle')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 6)
          .style('opacity', 1)

        tooltip.transition()
          .duration(200)
          .style('opacity', .9)
        tooltip.html(`
          <strong>Date:</strong> ${d.date.toLocaleDateString()}<br/>
          <strong>Balance:</strong> $${d.balance.toLocaleString()}
        `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px')
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 3)
          .style('opacity', 0.6)

        tooltip.transition()
          .duration(500)
          .style('opacity', 0)
      })

    // Add grid lines
    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(yScale)
        .tickSize(-width)
        .tickFormat(() => '')
      )
      .attr('stroke', '#333')  // Darker grid lines
      .attr('stroke-opacity', 0.3);

    // Add gradient definition
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'area-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#4a9eff')
      .attr('stop-opacity', 0.2);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#4a9eff')
      .attr('stop-opacity', 0);

    // Add the area
    svg.append('path')
      .datum(transactions)
      .attr('fill', 'url(#area-gradient)')
      .attr('d', line)

    // Cleanup function
    return () => {
      tooltip.remove()
    }
  }, [data, width, height, margin])

  return (
    <>
      <div className="chart-container">
        <div className="chart-header">
          <h2 className="chart-title">Transaction History ({dateRange})</h2>
          <button 
            className="view-transactions-button"
            onClick={() => setIsModalOpen(true)}
          >
            View Transaction History
          </button>
        </div>
        <div className="chart-wrapper">
          <svg ref={svgRef}></svg>
        </div>
      </div>
      <TransactionListModal
        data={data}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
} 
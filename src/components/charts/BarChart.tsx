import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

interface BarChartProps {
  data: Array<number>
  width?: number
  height?: number
  margin?: { top: number; right: number; bottom: number; left: number }
}

export default function BarChart({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 20, bottom: 30, left: 40 }
}: BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Update dimensions on container resize
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      const containerWidth = containerRef.current?.clientWidth || 0
      const containerHeight = containerRef.current?.clientHeight || 0
      
      console.log('Container dimensions:', { containerWidth, containerHeight })
      
      if (containerWidth > 0 && containerHeight > 0) {
        setDimensions({
          width: containerWidth,
          height: containerHeight
        })
      }
    }

    // Initial update
    updateDimensions()

    // Create a ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(containerRef.current)

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!svgRef.current || !dimensions.width || !dimensions.height) {
      console.log('Missing dimensions or SVG ref:', { 
        hasSvgRef: !!svgRef.current, 
        dimensions 
      })
      return
    }

    console.log('Drawing chart with dimensions:', dimensions)

    // Clear any existing chart
    d3.select(svgRef.current).selectAll('*').remove()

    // Calculate dimensions
    const innerWidth = dimensions.width - margin.left - margin.right
    const innerHeight = dimensions.height - margin.top - margin.bottom

    console.log('Inner dimensions:', { innerWidth, innerHeight })

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map((_, i) => i.toString()))
      .range([0, innerWidth])
      .padding(0.1)

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data) || 0])
      .range([innerHeight, 0])

    // Add bars
    svg.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (_, i) => xScale(i.toString()) || 0)
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight - yScale(d))
      .attr('class', 'bar')

    // Add axes
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    svg.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr('class', 'axis')

    svg.append('g')
      .call(yAxis)
      .attr('class', 'axis')

  }, [data, dimensions, margin])

  return (
    <div ref={containerRef} className="chart-container" style={{ border: '1px solid red' }}>
      <svg ref={svgRef}></svg>
    </div>
  )
} 
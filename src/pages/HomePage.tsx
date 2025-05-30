import React from 'react'
import { Link } from '@tanstack/react-router'

export default function HomePage() {
  return (
    <div className="home-page">
      <h1 className="main-title">DATA POSE</h1>
      <nav className="main-nav">
        <Link to="/music-transposition" className="nav-link">
          Music Transposition
        </Link>
        <Link to="/data-charts" className="nav-link">
          Data Charts
        </Link>
      </nav>
    </div>
  )
} 
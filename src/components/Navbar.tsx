import React from 'react'
import { Link, useRouter } from '@tanstack/react-router'

export default function Navbar() {
  const router = useRouter()
  const isHomePage = router.state.location.pathname === '/'

  // Don't show navbar on home page
  if (isHomePage) return null

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        DATA POSE
      </Link>
      <div className="navbar-links">
        <Link to="/music-transposition" className="navbar-link">
          Music Transposition
        </Link>
        <Link to="/data-charts" className="navbar-link">
          Data Charts
        </Link>
      </div>
    </nav>
  )
} 
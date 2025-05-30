import React from 'react'
import { Outlet } from '@tanstack/react-router'
import Navbar from '../components/Navbar'

export default function Root() {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  )
} 
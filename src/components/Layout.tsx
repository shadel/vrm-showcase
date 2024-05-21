// components/Layout.tsx
import { ReactNode } from 'react'
import Navbar from './Navbar'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  )
}

export default Layout

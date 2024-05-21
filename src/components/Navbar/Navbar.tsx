// src/components/Navbar/Navbar.tsx
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">VRM App</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-400">
            Manage VRM Models
          </Link>
          <Link to="/show" className="text-white hover:text-gray-400">
            Show VRM Model
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
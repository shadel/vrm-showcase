// components/Navbar.tsx
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">MyApp</div>
        <div className="space-x-4">
          <Link href="/" legacyBehavior>
            <a className="hover:text-gray-400">Home</a>
          </Link>
          <Link href="/vrm-management" legacyBehavior>
            <a className="hover:text-gray-400">VRM Management</a>
          </Link>
          <Link href="/show-page" legacyBehavior>
            <a className="hover:text-gray-400">Show VRM</a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

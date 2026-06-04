import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-green-600 text-white hover:bg-green-700',
  secondary: 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50',
  outline: 'bg-transparent text-white border-2 border-white hover:bg-white/10',
}

export default function Button({ label, path, variant = 'primary', className = '', onClick }) {
  const base = 'inline-block px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center cursor-pointer'

  if (onClick) {
    return (
      <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
        {label}
      </button>
    )
  }

  return (
    <Link to={path} className={`${base} ${variants[variant]} ${className}`}>
      {label}
    </Link>
  )
}

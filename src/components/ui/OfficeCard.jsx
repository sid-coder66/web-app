import { FaMapMarkerAlt } from 'react-icons/fa'

export default function OfficeCard({ country, address, mapUrl }) {
  return (
    <div className="text-sm">
      <h4 className="font-bold text-white mb-1 flex items-center gap-2">
        <FaMapMarkerAlt className="text-green-400" /> {country}
      </h4>
      <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors whitespace-pre-line">
        {address}
      </a>
    </div>
  )
}

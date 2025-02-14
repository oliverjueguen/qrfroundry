import { FC } from 'react'

interface TypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const QR_TYPES = [
  { id: 'url', label: 'Website URL', icon: '🌐' },
  { id: 'text', label: 'Plain Text', icon: '📝' },
  { id: 'vcard', label: 'Business Card', icon: '👤' },
  { id: 'email', label: 'Email', icon: '📧' },
  { id: 'wifi', label: 'WiFi', icon: '📶' },
  { id: 'sms', label: 'SMS', icon: '💬' },
  { id: 'phone', label: 'Phone Call', icon: '📞' },
  { id: 'location', label: 'Location', icon: '📍' },
  { id: 'event', label: 'Calendar Event', icon: '📅' }
] as const

const TypeSelector: FC<TypeSelectorProps> = ({ selectedType, onTypeChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Select QR Code Type
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {QR_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`p-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
              selectedType === type.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span>{type.icon}</span>
            <span>{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TypeSelector 
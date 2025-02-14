import { FC, useState, ChangeEvent, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

interface QRCodeGeneratorProps {
  type: 'url' | 'text' | 'vcard' | 'email' | 'wifi' | 'sms' | 'phone' | 'location' | 'event';
}

interface WifiFormData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

interface EmailFormData {
  email: string;
  subject: string;
  message: string;
}

interface VCardFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  title: string;
  website: string;
}

interface SMSFormData {
  phone: string;
  message: string;
}

interface LocationFormData {
  latitude: string;
  longitude: string;
  name: string;
}

interface EventFormData {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

const QRCodeGenerator: FC<QRCodeGeneratorProps> = ({ type }) => {
  const [input, setInput] = useState<string>('')
  const [wifiData, setWifiData] = useState<WifiFormData>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false
  })
  const [emailData, setEmailData] = useState<EmailFormData>({
    email: '',
    subject: '',
    message: ''
  })
  const [vcardData, setVcardData] = useState<VCardFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    title: '',
    website: ''
  })
  const [smsData, setSmsData] = useState<SMSFormData>({
    phone: '',
    message: ''
  })
  const [locationData, setLocationData] = useState<LocationFormData>({
    latitude: '',
    longitude: '',
    name: ''
  })
  const [eventData, setEventData] = useState<EventFormData>({
    title: '',
    startDate: '',
    endDate: '',
    location: '',
    description: ''
  })
  const [generated, setGenerated] = useState<boolean>(false)

  useEffect(() => {
    setInput('')
    setWifiData({
      ssid: '',
      password: '',
      encryption: 'WPA',
      hidden: false
    })
    setEmailData({
      email: '',
      subject: '',
      message: ''
    })
    setVcardData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      company: '',
      title: '',
      website: ''
    })
    setSmsData({
      phone: '',
      message: ''
    })
    setLocationData({
      latitude: '',
      longitude: '',
      name: ''
    })
    setEventData({
      title: '',
      startDate: '',
      endDate: '',
      location: '',
      description: ''
    })
    setGenerated(false)
  }, [type])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type: inputType } = e.target
    const checked = inputType === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    switch (type) {
      case 'wifi':
        setWifiData(prev => ({
          ...prev,
          [name]: checked !== undefined ? checked : value
        }))
        break
      case 'email':
        setEmailData(prev => ({ ...prev, [name]: value }))
        break
      case 'vcard':
        setVcardData(prev => ({ ...prev, [name]: value }))
        break
      case 'sms':
        setSmsData(prev => ({ ...prev, [name]: value }))
        break
      case 'location':
        setLocationData(prev => ({ ...prev, [name]: value }))
        break
      case 'event':
        setEventData(prev => ({ ...prev, [name]: value }))
        break
      default:
        setInput(value)
    }
    setGenerated(false)
  }

  const generateQRValue = (): string => {
    switch (type) {
      case 'wifi':
        return `WIFI:T:${wifiData.encryption};S:${wifiData.ssid};P:${wifiData.password};H:${wifiData.hidden ? 'true' : 'false'};;`
      case 'email':
        return `mailto:${emailData.email}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.message)}`
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardData.lastName};${vcardData.firstName}\nFN:${vcardData.firstName} ${vcardData.lastName}\nORG:${vcardData.company}\nTITLE:${vcardData.title}\nTEL:${vcardData.phone}\nEMAIL:${vcardData.email}\nURL:${vcardData.website}\nEND:VCARD`
      case 'sms':
        return `smsto:${smsData.phone}:${smsData.message}`
      case 'phone':
        return `tel:${input}`
      case 'location':
        return `geo:${locationData.latitude},${locationData.longitude}?q=${encodeURIComponent(locationData.name)}`
      case 'event':
        return `BEGIN:VEVENT\nSUMMARY:${eventData.title}\nDTSTART:${eventData.startDate.replace(/[-:]/g, '')}\nDTEND:${eventData.endDate.replace(/[-:]/g, '')}\nLOCATION:${eventData.location}\nDESCRIPTION:${eventData.description}\nEND:VEVENT`
      default:
        return input
    }
  }

  const renderInputFields = () => {
    switch (type) {
      case 'wifi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Network Name (SSID)</label>
              <input
                type="text"
                name="ssid"
                value={wifiData.ssid}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter WiFi network name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={wifiData.password}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter WiFi password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Encryption Type</label>
              <select
                name="encryption"
                value={wifiData.encryption}
                onChange={(e) => setWifiData(prev => ({ ...prev, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Encryption</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="hidden"
                checked={wifiData.hidden}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-white">Hidden Network</label>
            </div>
          </div>
        )

      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={emailData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={emailData.subject}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter email subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Message</label>
              <textarea
                name="message"
                value={emailData.message}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter email message"
                rows={4}
              />
            </div>
          </div>
        )

      case 'vcard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={vcardData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={vcardData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Last name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={vcardData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={vcardData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={vcardData.company}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Job Title</label>
              <input
                type="text"
                name="title"
                value={vcardData.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Job title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Website</label>
              <input
                type="url"
                name="website"
                value={vcardData.website}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Website URL"
              />
            </div>
          </div>
        )

      case 'sms':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={smsData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Message</label>
              <textarea
                name="message"
                value={smsData.message}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter message"
                rows={4}
              />
            </div>
          </div>
        )

      case 'phone':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Phone Number</label>
            <input
              type="tel"
              value={input}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter phone number"
            />
          </div>
        )

      case 'location':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Location Name</label>
              <input
                type="text"
                name="name"
                value={locationData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter location name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Latitude</label>
              <input
                type="text"
                name="latitude"
                value={locationData.latitude}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter latitude"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Longitude</label>
              <input
                type="text"
                name="longitude"
                value={locationData.longitude}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter longitude"
              />
            </div>
          </div>
        )

      case 'event':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Event Title</label>
              <input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter event title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Start Date & Time</label>
              <input
                type="datetime-local"
                name="startDate"
                value={eventData.startDate}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">End Date & Time</label>
              <input
                type="datetime-local"
                name="endDate"
                value={eventData.endDate}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter event location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Description</label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter event description"
                rows={4}
              />
            </div>
          </div>
        )

      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
              {type === 'url' ? 'Website URL' : 'Text Content'}
            </label>
            <input
              type={type === 'url' ? 'url' : 'text'}
              value={input}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={type === 'url' ? 'https://example.com' : 'Enter your text'}
            />
          </div>
        )
    }
  }

  const handleGenerate = (): void => {
    setGenerated(true)
  }

  const handleDownload = (): void => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const url = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `qrfoundry-${type}-${Date.now()}.png`
      link.href = url
      link.click()
    }
  }

  const isFormValid = (): boolean => {
    switch (type) {
      case 'wifi':
        return !!wifiData.ssid
      case 'email':
        return !!emailData.email
      case 'vcard':
        return !!(vcardData.firstName || vcardData.lastName)
      case 'sms':
        return !!smsData.phone
      case 'location':
        return !!(locationData.latitude && locationData.longitude)
      case 'event':
        return !!(eventData.title && eventData.startDate)
      default:
        return !!input.trim()
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        {renderInputFields()}
        <button
          onClick={handleGenerate}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          disabled={!isFormValid()}
        >
          Generate QR Code
        </button>
      </div>

      <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-700 p-8 rounded-lg">
        {generated && isFormValid() ? (
          <div className="space-y-4">
            <QRCodeCanvas 
              value={generateQRValue()}
              size={200}
              level="H"
              includeMargin={true}
            />
            <button 
              onClick={handleDownload}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              Download QR Code
            </button>
          </div>
        ) : (
          <div className="text-gray-400 dark:text-gray-300 text-center">
            QR code preview will appear here
          </div>
        )}
      </div>
    </div>
  )
}

export default QRCodeGenerator 
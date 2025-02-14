import { FC } from 'react'
import Head from 'next/head'
import { useState } from 'react'
import QRCodeGenerator from '@/components/QRCodeGenerator'
import TypeSelector from '@/components/TypeSelector'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GoogleTagManagerHead, GoogleTagManagerBody } from '@/components/GoogleTagManager'

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const Home: FC = () => {
  const [selectedType, setSelectedType] = useState<string>('url')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <GoogleTagManagerHead />
        <title>QRfoundry - Free QR Code Generator | Create QR Codes Online</title>
        <meta name="description" content="QRfoundry - Create free QR codes instantly. Generate QR codes for URLs, text, vCards, and more. No sign up required." />
        <meta name="keywords" content="QRfoundry, qr code generator, free qr codes, create qr code, qr maker" />
        <link rel="canonical" href="https://qrfoundry.com" />
      </Head>
      <GoogleTagManagerBody />
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Create Your QR Code for Free
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Generate QR codes instantly - No sign up required
          </p>
        </section>

        {/* QR Generator Section */}
        <section className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <TypeSelector 
            selectedType={selectedType} 
            onTypeChange={setSelectedType} 
          />
          <QRCodeGenerator type={selectedType as 'url' | 'text' | 'vcard' | 'email' | 'wifi' | 'sms'} />
        </section>

        {/* Features Section */}
        <section className="mt-16 grid md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Easy to Use"
            description="Generate QR codes in seconds with our simple interface"
            icon="🎯"
          />
          <FeatureCard 
            title="No Sign Up"
            description="Start creating QR codes immediately - no registration needed"
            icon="⚡"
          />
          <FeatureCard 
            title="Multiple Formats"
            description="Create QR codes for URLs, text, vCards, and more"
            icon="🔄"
          />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home 
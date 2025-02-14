import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">
          © {new Date().getFullYear()} QRfoundry. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer 
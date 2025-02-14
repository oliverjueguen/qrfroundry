import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QRfoundry - Create QR Codes Instantly",
  description: "Generate QR codes for URLs, WiFi, vCards, and more",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager - placed at the very top of head */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TJCXSTTG');`
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager NoScript - placed at start of body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJCXSTTG"
            height="0"
            width="0"
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
} 
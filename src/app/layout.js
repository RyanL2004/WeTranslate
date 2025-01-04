import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WeTranslate',
  description: 'AI-powered translation platform'
}

// src/app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background min-h-screen text-textPrimary">
        {children}
      </body>
    </html>
  )
}
